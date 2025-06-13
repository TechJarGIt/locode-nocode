
import { useNavigate } from 'react-router-dom';
import bgImage from '../assets/hero.png';

export default function Home() {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate('/create');
  };

  return (
    <main>
      <section className="hero w-full flex justify-center py-12 px-4">
        <div style={{ backgroundImage: `url(${bgImage})` }} className="w-full max-w-[80vw] min-h-[70vh] bg-cover bg-center rounded-xl flex items-center justify-center text-white px-6">
          <div className="max-w-2xl ">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Build apps faster with AppForge
            </h1>
            <p className="mb-6 text-lg">
              AppForge is a low-code/no-code platform that empowers anyone to create powerful applications
              without writing a single line of code.
            </p>
            <button onClick={handleStartClick} className="px-6 py-3 bg-white text-black font-semibold rounded-md hover:bg-gray-200">
              Start for free
            </button>
          </div>
        </div>
      </section>

      <section className='w-full flex flex-col justify-center py-12 px-4'>
        <h1 className='text-2xl md:text-3xl font-bold mb-4'>Key Features</h1>
        <p className='mb-6 text-lg'>AppForge offers a comprehensive suite of features designed to streamline app development
          and empower users of all skill levels.</p>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          <div className='bg-white p-6 rounded-lg shadow-md'>
            <h2 className='text-xl font-semibold mb-2'>Visual Builder</h2>
            <p>Drag-and-drop components to build your app's UI visually. Customize layouts, add functionality, and preview your app in real-time.</p>
          </div>

          <div className='bg-white p-6 rounded-lg shadow-md'>
            <h2 className='text-xl font-semibold mb-2'>AI-Powered App Generation</h2>
            <p>Generate app prototypes and functionalities using AI prompts. Describe your idea, and let AI create a starting point for you.</p>
          </div>

          <div className='bg-white p-6 rounded-lg shadow-md'>
            <h2 className='text-xl font-semibold mb-2'>Idea-to-App Conversion</h2>
            <p>Transform your app ideas into functional applications without any coding. Simply describe your concept, and Flowsy will handle the rest.</p>
          </div>

          <div className='bg-white p-6 rounded-lg shadow-md'>
            <h2 className='text-xl font-semibold mb-2'>Deployment</h2>
            <p>Deploy your app to a custom domain or subdomain with ease. Flowsy handles the hosting and scaling, so you can focus on building your app.</p>
          </div>
        </div>
      </section>

      <section className='w-full flex flex-col justify-center py-12 px-4'>
        <h1 className='text-2xl md:text-3xl font-bold mb-4'>Benefits of Low-Code/No-Code</h1>
        <p className='mb-6 text-lg'>
          AppForge leverages the power of low-code and no-code development to provide numerous advantages over traditional coding methods.
        </p>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          <div className='bg-white p-6 rounded-lg shadow-md'>
            <h2 className='text-xl font-semibold mb-2'>Faster Development</h2>
            <p>Build and deploy apps in days or weeks instead of months. Accelerate your time to market and respond quickly to changing business needs.</p>
          </div>

          <div className='bg-white p-6 rounded-lg shadow-md'>
            <h2 className='text-xl font-semibold mb-2'>Reduced Costs</h2>
            <p>Minimize development costs by reducing the need for specialized coding skills. Empower your existing team to create and maintain applications.</p>
          </div>

          <div className='bg-white p-6 rounded-lg shadow-md'>
            <h2 className='text-xl font-semibold mb-2'>Increased Agility</h2>
            <p>Adapt to evolving requirements and user feedback with ease. Make changes and updates quickly without complex code refactoring.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
