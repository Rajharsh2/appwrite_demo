import {account} from '@/appwrite/config';
import {getCurrentUser} from '@/service/auth';
import {redirect} from 'next/navigation';

export default async function Home() {
  const user = await getCurrentUser();
  // console.log(user);
  // const isValidToken = async () => {
  //   const tokenDecodedValue = await validateAccessToken();
  //   if (tokenDecodedValue === undefined) {
  //     redirect('/login');
  //   }
  //   const userService = new UserService();
  //   const userData = await userService.getUserByEmail(tokenDecodedValue.email);
  //   user = String(userData.userName).toUpperCase();
  //   console.log(user);
  // };
  // await isValidToken();

  if (user.type === 'success') {
    redirect('/todo');
  }
  return (
    <div className="p-[20%]">
      <h1 className="text-center font-bold text-green-700 text-2xl">
        Welcome to Project Mr/Mrs. {'Raj'}{' '}
      </h1>
    </div>
  );
}
