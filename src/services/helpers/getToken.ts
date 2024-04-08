import {auth} from '../../firebaseConfig';

export const GetToken = async (): Promise<string | null> => {
  const user = auth.currentUser;
  if (user) {
    return user.getIdToken();
  } else {
    return null;
  }
};