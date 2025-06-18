// import { getCarById } from '@/actions/car-listing';
// import { notFound } from 'next/navigation';
// import React from 'react'
// import TestDriveForm from './_components/test-drive-form';


// export async function generateMetadata() {
//   return {
//     title: `Book Test Drive | Vehiql`,
//     description: `Schedule a test drive in few seconds`,
//   };
// }

// const TestDrivePage = async ({ params }) => {
//   // Fetch car details
//   const { id } = params;
//   const result = await getCarById(id);


//   // If car not found, show 404
//   if (!result.success) {
//     notFound();
//   }

//   return (
//     <div className="container mx-auto px-4 py-12">
//       <h1 className="text-6xl mb-6 gradient-title">Book a Test Drive</h1>
//       <TestDriveForm
//         car={result.data}
//         testDriveInfo={result.data.testDriveInfo}
//       />
//     </div>
//   )
// }

// export default TestDrivePage
import { getCarById } from '@/actions/car-listing';
import { notFound } from 'next/navigation';
import TestDriveForm from './_components/test-drive-form';

// ✅ If you plan to use `params` for metadata in future, do this:
// export async function generateMetadata({ params }) { ... }

export async function generateMetadata() {
  return {
    title: `Book Test Drive | Vehiql`,
    description: `Schedule a test drive in few seconds`,
  };
}

// ✅ Important: Server components must use `export default async function`, not const arrow
export default async function TestDrivePage({ params }) {
  const { id } = params;
  const result = await getCarById(id);

  if (!result.success) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-6xl mb-6 gradient-title">Book a Test Drive</h1>
      <TestDriveForm
        car={result.data}
        testDriveInfo={result.data.testDriveInfo}
      />
    </div>
  );
}
