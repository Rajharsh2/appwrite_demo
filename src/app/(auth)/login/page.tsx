import Link from 'next/link';
import LoginUser from './login-user';
import {redirect} from 'next/navigation';
import {getCurrentUser} from '@/service/auth';

const LoginPage = async () => {
  const user = await getCurrentUser();

  if (user.type === 'success') {
    console.log(user.data);
    redirect('/todo');
  }
  return (
    <div className="w-[32rem] mx-auto  py-16 shadow-lg shadow-gray-900 opacity-80 bg-white">
      <div className="w-4/5 mx-auto">
        <h3 className="w-fill text-black text-xl text-left font-mono font-semibold mb-4">
          Login to your account
        </h3>
        <LoginUser />
        {/* <p className="text-black text-center font-semibold">
          Don&apos;t have an account ? &nbsp;
          <Link href="/register">
            <b className="text-blue-500 font-semibold hover:underline">
              Register
            </b>
          </Link>
        </p> */}
      </div>
    </div>
  );

  // return (
  //   <div className="w-96 mx-auto  py-10 shadow-lg shadow-gray-900 opacity-80 bg-white">
  //     <h3 className="text-green-900 text-xl text-center font-mono font-black mb-4">
  //       Login
  //     </h3>
  //     <LoginUser />
  //     <p className="text-black text-center font-semibold">
  //       Don&apos;t have an account ? &nbsp;
  //       <Link href="/register">
  //         <b className="text-blue-500 font-semibold hover:underline">
  //           Register
  //         </b>
  //       </Link>
  //     </p>
  //   </div>
  // );
};

export default LoginPage;
