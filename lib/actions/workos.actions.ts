// 'use server';

// import { WorkOS } from '@workos-inc/node';

// export const updateUser = async (user: UserUpdate) => {
//   const workosAPI = process.env.WORKOS_API_KEY;
//   try {
//     const workos = new WorkOS(`${workosAPI}`);

//     const updatedUser = await workos.userManagement.updateUser(user);

//     return updatedUser;
//   } catch (error) {
//     console.error('Error updating user:', error);
//     throw error;
//   }
// };
