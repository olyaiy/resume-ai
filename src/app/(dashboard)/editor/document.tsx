'use client'

import React from 'react';
import dynamic from 'next/dynamic';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

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
  });
  
  // Create Document Component
  const MyDocument = () => (
    <Document pageMode={'fullScreen'} pageLayout={"oneColumn"}>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>Lisan al-Gaib</Text>
        <Text style={styles.subHeader}>name@gmail.com | portfolio.com | github.com/name</Text>
        
        <View style={styles.sectionTitle}><Text>Skills</Text></View>
        <Text style={styles.content}>
          <Text style={styles.bold}>CAD: </Text>Siemens NX, CATIA V5, SolidWorks{'\n'}
          <Text style={styles.bold}>Analysis: </Text>Thermal Desktop, Abaqus, LS-DYNA, STAR-CCM+
        </Text>
  
        <View style={styles.sectionTitle}><Text>Experience</Text></View>
        <Text style={styles.content}>
          <Text style={styles.bold}>Job Title, </Text>Company – City, ST        June 2022 – Present
        </Text>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.listItemContent}><Text style={styles.bold}>STAR: </Text>Situation Task Action Result: Briefly describe a specific situation, task, action taken, and the result achieved</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.listItemContent}><Text style={styles.bold}>STAR: </Text>Another example of a situation, task, action, and result</Text>
        </View>
  
        <Text style={styles.content}>
          <Text style={styles.bold}>Job Title, </Text>Company – City, ST        Jan 2021 – May 2022
        </Text>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.listItemContent}><Text style={styles.bold}>XYZ: </Text>Accomplished X as measured by Y by doing Z</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.listItemContent}><Text style={styles.bold}>XYZ: </Text>Another example of accomplishment X, measurement Y, and action Z</Text>
        </View>
  
        <View style={styles.sectionTitle}><Text>Projects</Text></View>
        <Text style={styles.content}>
          <Text style={styles.bold}>Project Title        </Text>name.com/projectdemo
        </Text>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.listItemContent}>Brief description of the project and its significance</Text>
        </View>
  
        <View style={styles.sectionTitle}><Text>Education</Text></View>
        <Text style={styles.content}>
          <Text style={styles.bold}>School </Text>– PhD in Mechanical Engineering        May 2010{'\n'}
          <Text style={styles.bold}>School </Text>– MS in Mechanical Engineering         June 2006{'\n'}
          <Text style={styles.bold}>School </Text>– BS in Mechanical Engineering         Apr 2004
        </Text>
      </Page>
    </Document>
  );

const ResumeDocument = () => (
  <PDFViewer width="100%" className='h-full'>
    <MyDocument />
  </PDFViewer>
);

export default ResumeDocument;