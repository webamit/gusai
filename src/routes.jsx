import { Icon } from './lib/chakra';
import {
  MdFileCopy,
  MdHome,
  MdLock,
  MdLayers,
  MdAutoAwesome,
  MdOutlineManageAccounts,
  MdAssistant,
} from 'react-icons/md';
import { IoMdPerson } from 'react-icons/io';
import { LuHistory } from 'react-icons/lu';
import { RoundedChart } from '@/components/icons/Icons';

const routes = [
  {
    name: 'All Templates',
    path: '/all-templates',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    collapse: false,
    rightElement: true,
  },
  {
    name: 'My Projects',
    path: '/my-projects',
    icon: <Icon as={MdLayers} width="20px" height="20px" color="inherit" />,
    collapse: false,
  },
  {
    name: 'Chat UI',
    path: '/chat',
    icon: (
      <Icon as={MdAutoAwesome} width="20px" height="20px" color="inherit" />
    ),
    collapse: false,
  },
  {
    name: 'AI Assistant',
    path: '/ai-assistant',
    icon: <MdAssistant className="-mt-[7px] h-5 w-5 text-inherit" />,
    collapse: false,
  },
  // --- Others ---
  {
    name: 'Other Pages',
    path: '/others',
    icon: <Icon as={MdFileCopy} width="20px" height="20px" color="inherit" />,
    collapse: true,
    items: [
      {
        name: 'Prompt Page',
        layout: '/others',
        path: '/prompt',
      },
      {
        name: 'Register',
        layout: '/others',
        path: '/register',
      },
      {
        name: 'Sign In',
        layout: '/others',
        path: '/sign-in',
      },
    ],
  },
  // --- Admin Pages ---
  {
    name: 'Admin Pages',
    path: '/admin',
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    collapse: true,
    items: [
      {
        name: 'All Templates',
        layout: '/admin',
        path: '/all-admin-templates',
      },
      {
        name: 'New Template',
        layout: '/admin',
        path: '/new-template',
      },
      {
        name: 'Edit Template',
        layout: '/admin',
        path: '/edit-template',
      },
      {
        name: 'Users Overview',
        layout: '/admin',
        path: '/overview',
      },
    ],
  },
  {
    name: 'Profile Settings',
    path: '/settings',
    icon: (
      <Icon
        as={MdOutlineManageAccounts}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    invisible: true,
    collapse: false,
  },
  {
    name: 'History',
    path: '/history',
    icon: <Icon as={LuHistory} width="20px" height="20px" color="inherit" />,
    invisible: true,
    collapse: false,
  },
  {
    name: 'Usage',
    path: '/usage',
    icon: <Icon as={RoundedChart} width="20px" height="20px" color="inherit" />,
    invisible: true,
    collapse: false,
  },
  {
    name: 'My plan',
    path: '/my-plan',
    icon: <Icon as={RoundedChart} width="20px" height="20px" color="inherit" />,
    invisible: true,
    collapse: false,
  },
  // -------------- Prompt Pages --------------
  {
    name: 'Essay Generator',
    path: '/essay',
    icon: <Icon as={IoMdPerson} width="20px" height="20px" color="inherit" />,
    invisible: true,
    collapse: false,
  },
  {
    name: 'Content Simplifier',
    path: '/simplifier',
    icon: <Icon as={IoMdPerson} width="20px" height="20px" color="inherit" />,
    invisible: true,
    collapse: false,
  },
  {
    name: 'Product Description',
    path: '/product-description',
    icon: <Icon as={IoMdPerson} width="20px" height="20px" color="inherit" />,
    invisible: true,
    collapse: false,
  },
  {
    name: 'Email Enhancer',
    path: '/email-enhancer',
    icon: <Icon as={IoMdPerson} width="20px" height="20px" color="inherit" />,
    invisible: true,
    collapse: false,
  },
  {
    name: 'LinkedIn Message',
    path: '/linkedin-message',
    icon: <Icon as={IoMdPerson} width="20px" height="20px" color="inherit" />,
    invisible: true,
    collapse: false,
  },
  {
    name: 'Instagram Caption',
    path: '/caption',
    icon: <Icon as={IoMdPerson} width="20px" height="20px" color="inherit" />,
    invisible: true,
    collapse: false,
  },
  {
    name: 'FAQs Content',
    path: '/faq',
    icon: <Icon as={IoMdPerson} width="20px" height="20px" color="inherit" />,
    invisible: true,
    collapse: false,
  },
  {
    name: 'Product Name Generator',
    path: '/name-generator',
    icon: <Icon as={IoMdPerson} width="20px" height="20px" color="inherit" />,
    invisible: true,
    collapse: false,
  },
  {
    name: 'SEO Keywords',
    path: '/seo-keywords',
    icon: <Icon as={IoMdPerson} width="20px" height="20px" color="inherit" />,
    invisible: true,
    collapse: false,
  },
  {
    name: 'Review Responder',
    path: '/review-responder',
    icon: <Icon as={IoMdPerson} width="20px" height="20px" color="inherit" />,
    invisible: true,
    collapse: false,
  },
  {
    name: 'Business Idea Generator',
    path: '/business-generator',
    icon: <Icon as={IoMdPerson} width="20px" height="20px" color="inherit" />,
    invisible: true,
    collapse: false,
  },
  {
    name: 'Article Generator',
    path: '/article',
    icon: <Icon as={IoMdPerson} width="20px" height="20px" color="inherit" />,
    invisible: true,
    collapse: false,
  },
  {
    name: 'Plagiarism Checker',
    path: '/plagiarism-checker',
    icon: <Icon as={IoMdPerson} width="20px" height="20px" color="inherit" />,
    invisible: true,
    collapse: false,
  },
  {
    name: 'Hashtags Generator',
    path: '/hashtags-generator',
    icon: <Icon as={IoMdPerson} width="20px" height="20px" color="inherit" />,
    invisible: true,
    collapse: false,
  },
  {
    name: 'Pet Name Generator',
    path: '/pet-name-generator',
    icon: <Icon as={IoMdPerson} width="20px" height="20px" color="inherit" />,
    invisible: true,
    collapse: false,
  },
  {
    name: 'Translator',
    path: '/translator',
    icon: <Icon as={IoMdPerson} width="20px" height="20px" color="inherit" />,
    invisible: true,
    collapse: false,
  },
  {
    name: 'Domain Name Generator',
    path: '/domain-name-generator',
    icon: <Icon as={IoMdPerson} width="20px" height="20px" color="inherit" />,
    invisible: true,
    collapse: false,
  },
  {
    name: 'Bootstrap to Tailwind Converter',
    path: '/bootstrap-to-tailwind-converter',
    icon: <Icon as={IoMdPerson} width="20px" height="20px" color="inherit" />,
    invisible: true,
    collapse: false,
  },
];

export default routes;
