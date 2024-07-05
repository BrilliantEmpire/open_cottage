import React from "react";

export default function page() {
  return <div>page</div>;
}

// import React from "react";
// import { Tabs } from "antd";
// import TabRecipes from "@/components/profile/TabRecipes";
// import { getAllCommunities } from "@/services/recipes.services";
// import LeftColumnUsers from "@/components/usersProfile/LeftColumUsers";
// import UsersBanner from "@/components/user/UsersBanner";
// import CommunityPostCard from "@/components/community-posts/CommunityPostCard";

// const Profile = async ({ searchParams }) => {
//   const communities = await getAllCommunities();

//   const { createPost, commentsId } = searchParams;

//   return (
//     <div className="relative userprofile-age">
//       <div className="user-banner">
//         <UsersBanner />
//       </div>
//       <div className="flex justify-end px-24 my-8 md:px-0 md:gap-3 sm:mt-0 sm:flex-wrap">
//         {/* Left Column */}
//         <div className="absolute w-1/4 top-8 left-24 sm:w-full left-col">
//           <LeftColumnUsers />
//         </div>

//         {/* Right Column */}
//         <div className="w-[69%] sm:w-full right-col sm:mb-4">
//           <Tabs
//             defaultActiveKey="1"
//             items={[
//               {
//                 label: "Posts",
//                 key: "1",
//                 children: (
//                   <div>
//                     {communities?.map((community, index) => (
//                       <CommunityPostCard
//                         post={community}
//                         key={community._id}
//                         index={index}
//                         commentsId={
//                           Number(commentsId) === community.pk ? true : false
//                         }
//                       />
//                     ))}
//                   </div>
//                 ),
//               },
//               {
//                 label: "Recipe",
//                 key: "2",
//                 children: <TabRecipes />,
//               },
//               // {
//               //   label: "Saved Recipe",
//               //   key: "3",
//               //   children: <TabRecipes />,
//               // },
//             ]}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;
