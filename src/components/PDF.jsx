import React, { useContext } from 'react';
import logo from './images/logo.jpeg'
import {Page, Text, View, Document, StyleSheet, PDFViewer,Font,Image, PDFDownloadLink } from '@react-pdf/renderer';
import Poppins_ExtraBold from './font/Poppins-ExtraBold.ttf'



Font.register({ family: 'Poppins', src: 'https://fonts.gstatic.com/s/poppins/v15/pxiByp8kv8JHgFVrLGT9Z1xlEA.ttf'})
Font.register({ family: 'Poppins-ExtraBold', src:Poppins_ExtraBold})

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#fff', 
  },
  sections: {
    marginTop: '30%',
    marginBottom:'8%',
    textAlign:'center',
    padding: 10,
    
  },
  text: {
    fontFamily:'Poppins-ExtraBold',
    fontWeight: 900,
  },
  image:{
    width:'30%',
    top:'20px',
    left:'20px',
    position:'absolute',
  },
  
});



// Create Document Component
function MyDocument({data}) {
    return (
    <Document>
    <Page size="A4" style={styles.page}>
        <View >
            <Image src={logo} style={styles.image} />
        </View>
        <View style={styles.sections}>
            <Text style={styles.text}>Les données du véhicule</Text>
        </View>
        <View style={{padding:'10px'}}>
            <View style={{marginTop:'20px',backgroundColor:'rgb(28,100,242,0.5)',borderRadius:'3px',padding:'5px' ,display:'flex',alignContent:'center',fontFamily:'Poppins-ExtraBold',flexDirection:'row',border:'1px solid black',fontWeight:800}}>
                <Text style={{width:'20%' , fontSize:'10'}}>
                    name
                </Text>
                <Text style={{width:'20%' , fontSize:'10'}}>
                    matricule
                </Text>
                <Text style={{width:'20%' , fontSize:'10'}}>
                    type
                </Text>
                <Text style={{width:'20%' , fontSize:'10'}}>
                    capacite
                </Text>
                <Text style={{width:'20%' , fontSize:'10'}}>
                    mot de passe
                </Text>
            </View>
            <View style={{marginTop:'5px',backgroundColor:'#E1EEDD',borderRadius:'3px',padding:'5px' ,display:'flex',alignContent:'center',fontFamily:'Poppins',flexDirection:'row'}}>
                <Text style={{width:'20%' , fontSize:'10'}}>
                    {data && data.name}
                </Text>
                <Text style={{width:'20%' , fontSize:'10'}}>
                {data && data.matricule}

                </Text>
                <Text style={{width:'20%' , fontSize:'10'}}>
                {data && data.type}

                </Text>
                <Text style={{width:'20%' , fontSize:'10'}}>
                {data && data.capacite}
                </Text>
                <Text style={{width:'20%' , fontSize:'10'}}>
                {data && data.firstPassword}
                </Text>
            </View>
            <View style={{marginTop:'5px',backgroundColor:'#E1EEDD',borderRadius:'3px',padding:'5px' ,display:'flex',alignContent:'center',fontFamily:'Poppins',flexDirection:'row'}}>
                <Text style={{width:'30%' , fontSize:'10',fontFamily:'Poppins-ExtraBold'}}>
                    Message
                </Text>
                <Text style={{width:'70%' , fontSize:'10',}}>
                veuillez changer le mot de passe depuis votre tableau de bord
                </Text>
            </View>
        </View>
    </Page>
  </Document>
)};

export default function PDfDownloadBtn({data}){
      return(
      <>
      <PDFDownloadLink document={<MyDocument data={data}  />} fileName={data.matricule+'.pdf'}>
            <button className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded inline-flex items-center">
                <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/></svg>
                <span>Télécharger</span>
            </button>
      </PDFDownloadLink>
    </>
      )
}

