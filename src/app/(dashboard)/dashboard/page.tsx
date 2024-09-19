import Dashboard from "./dashboard";
import PocketBase from 'pocketbase';
import { Resume } from '@/lib/types';
import { logout } from '@/app/actions';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';


const pb = new PocketBase('http://127.0.0.1:8090');



export default async function Page() {

    const resumeList = (await pb.collection('resumes').getList(1, 8)).items as Resume[];



    
    return <Dashboard resumeList={resumeList}/>
}

// ./app/dashboard.tsx




// export default function Page() {
//   const cookie = cookies().get('pb_auth');

//   // This never happens because of the middleware,
//   // but we must make typescript happy
//   if (!cookie) 
//   {
//     redirect('/');
//   }

//   const { model } = JSON.parse(cookie.value);

//   return (
//     <main>
//       <p>This is the dashboard. Only logged-in users can view this route</p>
//       <p>Logged-in user: </p>
//       <pre>{JSON.stringify(model, null, 2)}</pre>
//       <form action={logout}>
//         <button type="submit">logout</button>
//       </form>
//     </main>
//   );
// }
