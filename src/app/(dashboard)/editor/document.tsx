'use client'

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { Resume, SkillCategories, SkillsArray } from '@/lib/types';

// Dynamically import PDFViewer with ssr option set to false
const PDFViewer = dynamic(() => import('@react-pdf/renderer').then(mod => mod.PDFViewer), {
  ssr: false,
});


Font.register({
    family: 'Arial',
    fonts: [
    { src: 'https://cdn.jsdelivr.net/npm/@canvas-fonts/arial@1.0.4/Arial.ttf', fontWeight: 'normal' },
    { src: 'https://cdn.jsdelivr.net/npm/@canvas-fonts/arial-bold@1.0.4/Arial%20Bold.ttf', fontWeight: 'bold' },
    ]
    },
  );

// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        padding: 30,
        fontFamily: 'Arial',

        
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
      marginBottom: 5,
      borderBottom: '1 solid black',
      paddingBottom: 2,
    },
    content: {
        fontWeight: 'normal',
        fontSize: 11,
        lineHeight: 1.2,
    },
    bold: {
      fontWeight: 'bold',
      fontSize: 11,
      lineHeight: 1.2,
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
    jobTitle: {
        fontSize: 11,
        fontWeight: 'bold',
      },
      companyName: {

        fontSize: 11,
      },
      skillCategory: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    skillCategoryWrapper: {
        marginRight: 5,
    },
    skillCategoryText: {
        fontWeight: 'bold',
        fontSize: 11,
    },
    skillListWrapper: {
        flex: 1,
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

        {(resumeData.skills as SkillsArray).map((skillCategory, index) => {
            const category = Object.keys(skillCategory)[0] as SkillCategories;
            const skillsList = skillCategory[category];

            return (
                <View key={index} style={styles.skillCategory}>
                    <View style={styles.skillCategoryWrapper}>
                        <Text style={styles.skillCategoryText}>{category}:</Text>
                    </View>
                    <View style={styles.skillListWrapper}>
                        <Text style={styles.content}>{skillsList}</Text>
                    </View>
                </View>
            );
        })}

        {/* Work Experience */}
        <View style={styles.sectionTitle}><Text>Experience</Text></View>
        {resumeData.work_history.map((job, index) => (
        <React.Fragment key={index}>

            {/* Job Header */}

            <View style={styles.jobHeader}>
            <View style={styles.jobInfo}>
                <Text>
                <Text style={styles.jobTitle}>{job.position}, </Text>
                <Text style={styles.companyName}>{job.company}</Text>
                </Text>
            </View>
            <Text style={styles.dateRange}>{job.date}</Text>
            </View>

            {/* Job Description */}
            <View style={styles.content}>
                <Text style={styles.content}>{job.description}</Text>
            </View>

            {/* Accomplishments */}
            {job.accomplishments.map((accomplishment, accIndex) => (
            <View key={accIndex} style={styles.listItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.listItemContent}>{accomplishment}</Text>
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
                    {/* Project Name */}
                    <Text style={styles.bold}>{project.name}</Text>
                    {/* Project Technologies */}
                    <Text> | {project.technologies.join(', ')}</Text>
                </Text>

                {/* Description */}
                <View style={styles.listItem}>
                    <Text style={styles.content}>
                        {project.description}
                    </Text>
                </View>

                {/* Accomplishment */}
                {project.accomplishments.map((accomplishment, accIndex) => (
                    <View key={accIndex} style={styles.listItem}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.listItemContent}>
                            {accomplishment}
                        </Text>
                    </View>
                ))}

                {/* Project Url */}
                {project.url && <Text style={styles.content}>{project.url}</Text>}  
                
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
                    <View style={styles.jobInfo}>
                        <Text style={styles.content}>
                            <Text style={[styles.content, styles.bold]}>{edu.institution}</Text>
                            <Text> | {edu.degree}</Text>
                        </Text>
                    </View>
                    <Text style={styles.dateRange}>{edu.date}</Text>
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