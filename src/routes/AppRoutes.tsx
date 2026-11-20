import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ProfilePage from '../pages/aboutPages/ProfilePage';
import WorkPage from '../pages/aboutPages/WorkPage';
import EducationPage from '../pages/aboutPages/EducationPage';
import FellowShipScholarshipPage from '../pages/aboutPages/FellowshipScholarshipPage';
import ManualsPage from '../pages/writingsPages/ManualsPage';
import VideosPage from '../pages/GalleryPages/VideosPage';
import Layout from './Layout';
import AwardsPage from '../pages/aboutPages/AwardsPage';
import PortraitsPage from '../pages/GalleryPages/PicturesPages/PortraitsPage';
import NewsPage from '../pages/GalleryPages/NewsPage';
import BlogPage from '../pages/BlogPage';
import ContactPage from '../pages/ContactPage';
import ErrorPage from '../pages/ErrorPage';
import PapersPage from '../pages/writingsPages/PapersPage';
import TextBooksPage from '../pages/writingsPages/TextBooksPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, 
    children: [
      {
        index: true,
        element: <Navigate to="/home" replace={true} />,
      },
      {
        path: "home",
        element: <HomePage />,
      },
      {
        path: "about",
        children: [
          {
            index: true,
            element: <Navigate to="profile" replace={true} />,
          },
          {
            path: "profile",
            element: <ProfilePage />,
          },
          {
            path: "my-work",
            element: <WorkPage />,
          },
          {
            path: "education",
            element: <EducationPage />,
          },
          {
            path: "fellowships-and-scholarships",
            element: <FellowShipScholarshipPage />,
          },
          {
            path: "fellowships-and-schloarships",
            element: <Navigate to="/about/fellowships-and-scholarships" replace={true} />,
          },
          {
            path: "awards-and-recognitions",
            element: <AwardsPage />,
          },
        ],
      },
      {
        path: "writings",
        children: [
          {
            index: true,
            element: <Navigate to="papers" replace={true} />,
          },
          {
            path: "law-and-human-rights",
            element: <Navigate to="/writings/papers" replace={true} />,
          },
          {
            path: "papers",
            element: <PapersPage />,
          },
          {
            path: "textbooks",
            element: <TextBooksPage/>,
          },
          {
            path: "manuals",
            element: <ManualsPage />,
          },
        ],
      },
      {
        path: "gallery",
        children: [
          {
            index: true,
            element: <Navigate to="videos" replace={true} />,
          },
          {
            path: "videos",
            element: <VideosPage />,
          },
          {
            path: "news",
            element: <NewsPage />,
          },
          {
            path: "pictures",
            element: <PortraitsPage />,
            // children: [
            //   {
            //     path: "portraits",
            //     element: <PortraitsPage />,
            //   },
            // ],
          },
        ],
      },
      {
        path: "blog",
        element: <BlogPage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);

const AppRoutes: React.FC = () => {
  return (
    <RouterProvider router={router} />
  );
}

export default AppRoutes;
