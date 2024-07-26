// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const Adminfiles = () => {
//   const [uploads, setUploads] = useState([]);

//   useEffect(() => {
//     const fetchUploads = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/useruploads');
//         console.log(response.data); // Log the response data
//         setUploads(response.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchUploads();
//   }, []);

//   return (
//     <div>
//       <h2>Admin Page</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Description</th>
//             <th>File</th>
//           </tr>
//         </thead>
//         <tbody>
//           {uploads.map((upload) => (
//             <tr key={upload._id}>
//               <td>{upload.name}</td>
//               <td>{upload.email}</td>
//               <td>{upload.description}</td>
//               <td>
//                 <a href={`http://localhost:5000/api/useruploads/${upload.filename}`} download>{upload.originalname}</a>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Adminfiles;
