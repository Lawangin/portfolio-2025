import type { IconType } from 'react-icons/lib'

export interface Project {
  title: string
  description: string
  image: string
  demoLink: string
  githubLink: string
  icons: IconType[]
  skills: { name: string }[]
}

export const projectsData: Project[] = [
  {
    title: 'CLI Deployer',
    description: `A command-line deployment tool built in Go that automates the complete deployment of static websites to AWS. 
    It creates S3 buckets for hosting, provisions CloudFront CDN distributions with SSL/TLS certificates, and configures Route 
    53 DNS records, all with automatic rollback on failure.`,
    image: '/cli-tool.png',
    demoLink: '',
    githubLink: 'https://github.com/Lawangin/cli-static-web',
    icons: [],
    skills: [
      { name: 'Go' },
      { name: 'AWS S3' },
      { name: 'CloudFront' },
      { name: 'Route 53' },
      { name: 'Docker' },
    ],
  },
  {
    title: 'Cleaning With Love Website',
    description: `Cleaning with Love is a client-facing web app designed around the connection between mental health and cleaning 
      services. The application includes a custom service estimation system and was deployed using AWS Amplify, with S3 used for asset storage.`,
    image: '/cleaning_with_love_mock_up.png',
    demoLink: 'https://dev.d2olmne5931by.amplifyapp.com/',
    githubLink: 'https://github.com/Lawangin/cleaningwithlove-web/tree/main',
    icons: [],
    skills: [
      { name: 'React' },
      { name: 'Next.js' },
      { name: 'AWS Amplify' },
      { name: 'Tailwind' },
    ],
  },
  {
    title: 'Micro-Frontend Demo',
    description: `This project demonstrates how to set up Module Federation between two Vite React applications(a host app and a remote app).
      In this setup, the remote app exposes components (or other modules) that the host app can load dynamically at runtime. 
      We use vite-plugin-federation to manage this integration.`,
    image: '/LawanginKhanLOGO-01.svg',
    demoLink: '',
    githubLink: 'https://github.com/Lawangin/micro-fe-module-fed',
    icons: [],
    skills: [{ name: 'Vite' }, { name: 'React' }],
  },
  {
    title: 'Demo Blogging App',
    description: `A demo blogging app built to demonstrate authentication workflows, data persistence with MongoDB, and GraphQL for efficient querying.
      The project emphasizes practical backend architecture, schema-driven development, and maintainable query patterns.`,
    image: '/blogging-app.png',
    demoLink: 'https://github.com/Lawangin/blog-frontend-react/blob/master/public/Nov-26-2019%20blogging-app.gif',
    githubLink: 'https://github.com/Lawangin/blog-frontend-react',
    icons: [],
    skills: [
      { name: 'GraphQL' },
      { name: 'Node.js' },
      { name: 'React' },
      { name: 'MongoDB' },
    ],
  },
]
