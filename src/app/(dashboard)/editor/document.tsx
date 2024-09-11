'use client'

import React from 'react';
import dynamic from 'next/dynamic';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { Resume } from '@/lib/types';

// Dynamically import PDFViewer with ssr option set to false
const PDFViewer = dynamic(() => import('@react-pdf/renderer').then(mod => mod.PDFViewer), {
  ssr: false,
});

// Create styles
const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      backgroundColor: '#ffffff',
      padding: 30,
    },
    header: {
      fontSize: 24,
      marginBottom: 5,
      textAlign: 'center',
    },
    jobHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 5,
      },
      jobInfo: {
        flex: 1,
      },
      dateRange: {
        fontSize: 11,
        textAlign: 'right',
    },
  
    subHeader: {
      fontSize: 11,
      marginBottom: 10,
      textAlign: 'center',
    },
    sectionTitle: {
      fontSize: 12.5,
      fontWeight: 'bold',
      marginBottom: 5,
      borderBottom: '1 solid black',
      paddingBottom: 2,
    },
    content: {
      fontSize: 11,
      lineHeight: 1.2,
    },
    bold: {
      fontWeight: 'bold',
    },
    listItem: {
      flexDirection: 'row',
      marginBottom: 3,
      fontSize: 11,
      lineHeight: 1.2,

    },
    bullet: {
      width: 10,
      fontSize: 11,
    },
    listItemContent: {
      flex: 1,
      fontSize: 11,
      lineHeight: 1.2,

    },
    skillCategory: {
        marginBottom: 5,
        fontSize: 11,
        fontWeight: 'extrabold',

    },
  });
  
 

const ResumeDocument = ({resumeData}: {resumeData: Resume}) => (

  <PDFViewer width="100%" className='h-full'>
    <Document pageMode={'fullScreen'} pageLayout={"oneColumn"}>
      <Page size="A4" style={styles.page}>

        {/* Name */}
        <Text style={styles.header}>{resumeData.name}</Text>
        <Text style={styles.subHeader}>name@gmail.com | portfolio.com | github.com/name</Text>
        
        {/* Skills */}
        <View style={styles.sectionTitle}>
            <Text>Skills</Text>
        </View>

        {resumeData.skills.map((skillCategory, index) => {
            const category = Object.keys(skillCategory)[0];
            const skillsList = skillCategory[category];
            return (
                <View key={index} style={styles.skillCategory}>
                    <Text>
                        <Text style={styles.bold}>{category}: </Text>
                        <Text style={styles.content}>{skillsList}</Text>
                    </Text>
                </View>
            );
        })}

        {/* Work Experience */}
        <View style={styles.sectionTitle}><Text>Experience</Text></View>
            {resumeData.work_history.map((job, index) => (
            <React.Fragment key={index}>
                <View style={styles.jobHeader}>
                    <View style={styles.jobInfo}>
                        <Text style={styles.content}>
                        <Text style={styles.bold}>{job.position}, </Text>{job.company}
                        </Text>
                    </View>
                    <Text style={styles.dateRange}>{job.startDate} – {job.endDate}</Text>
                </View>
                {job.description.split('\n').map((bullet, bulletIndex) => (
                <View key={bulletIndex} style={styles.listItem}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.listItemContent}>{bullet}</Text>
                </View>
                ))}
            </React.Fragment>
            ))}

        {/* Projects */}
        <View style={styles.sectionTitle}>
            <Text>Projects</Text>
        </View>
                {resumeData.projects.map((project, index) => (
                    <React.Fragment key={index}>


                        <Text style={styles.content}>
                            <Text style={styles.bold}>
                                {project.name}        
                            </Text>
                        </Text>

                        {/* Project Url */}
                        {project.url && <Text style={styles.content}>{project.url}</Text>}

                        <Text style={styles.content}>
                            {project.technologies.join(', ')}
                        </Text>

                        <View style={styles.listItem}>
                            <Text style={styles.bullet}>•</Text>
                            <Text style={styles.listItemContent}>
                                {project.description}
                            </Text>
                        </View>

                        
                        {index < resumeData.projects.length - 1 && <View style={{ marginBottom: 10 }} />}
                    </React.Fragment>
                ))}
        
        {/* Education */}
        <View style={styles.sectionTitle}>
            <Text>Education</Text>
        </View>
        {resumeData.education_history.map((edu, index) => (
            <View key={index} style={{ marginBottom: index < resumeData.education_history.length - 1 ? 10 : 0 }}>
                <View style={styles.jobHeader}>
                    <Text style={styles.content}>
                        <Text style={[styles.content, styles.bold]}>{edu.institution} | </Text>
                        {edu.degree} in {edu.fieldOfStudy}
                    </Text>

                    
                    <Text style={styles.dateRange}>{edu.endDate}</Text>
                </View>
                {edu.description && (
                    <View style={styles.listItem}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.listItemContent}>{edu.description}</Text>
                    </View>
                )}
            </View>
        ))}


      </Page>
    </Document>
  </PDFViewer>
);

export default ResumeDocument;