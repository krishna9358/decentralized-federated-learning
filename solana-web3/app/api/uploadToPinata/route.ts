// import { NextRequest, NextResponse } from 'next/server';
// import axios from 'axios';
// import FormData from 'form-data';

// export async function POST(req:NextRequest) {
//   try {
//     const formData = new FormData();
//     const file = await req.formData();
    
//     // const pinataApiKey = process.env.PINATA_API_KEY;
//     // const pinataSecretApiKey = process.env.PINATA_SECRET_API_KEY;
    
//     formData.append('file', file.get('file'));

//     const metadata = JSON.stringify({
//       name: 'MyFile',
//       keyvalues: {
//         customKey: 'customValue'
//       }
//     });

//     formData.append('pinataMetadata', metadata);

//     const options = JSON.stringify({
//       cidVersion: 1
//     });

//     formData.append('pinataOptions', options);

//     const response = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
//       maxBodyLength: Infinity,
//       headers: {
//         'Content-Type': `multipart/form-data; boundary=${(formData as FormData).getBoundary}`,
//         pinata_api_key: process.env.pinataApiKey,
//         pinata_secret_api_key: process.env.pinataSecretApiKey,
//       },
//     });

//     return NextResponse.json({
//       success: true,
//       cid: response.data.IpfsHash,
//     });
//   } catch (error ) {
//     const message = error instanceof Error ? error.message : 'An unknown error occurred'; 
//     return NextResponse.json({ success: false, message }, { status: 500 });
//   }
// }
