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
      marginBottom: 20,
      textAlign: 'center',
    },
    subHeader: {
      fontSize: 18,
      marginBottom: 10,
    },
    section: {
      marginBottom: 10,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    sectionContent: {
      fontSize: 12,
      lineHeight: 1.5,
    },
  });
  

// Create Document Component
const MyDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>John Doe</Text>
        <Text style={styles.subHeader}>Web Developer</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Summary</Text>
          <Text style={styles.sectionContent}>Experienced web developer with a strong background in React and TypeScript.</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experience</Text>
          <Text style={styles.sectionContent}>
            Senior Developer at Tech Co. (2018-Present){'\n'}
            - Led development of key projects{'\n'}
            - Mentored junior developers
          </Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          <Text style={styles.sectionContent}>
            B.S. in Computer Science{'\n'}
            University of Technology (2014-2018)
          </Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <Text style={styles.sectionContent}>
            React, TypeScript, Node.js, Next.js, GraphQL
          </Text>
        </View>
      </Page>
    </Document>
  );

const ResumeDocument = () => (
  <PDFViewer width="100%" className='h-full'>
    <MyDocument />
  </PDFViewer>
);

export default ResumeDocument;