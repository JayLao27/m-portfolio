import React from 'react'

interface Project {
  id: number
  title: string
  description: string
  technologies: string[]
  link?: string
  imageUrl?: string
}

const projectsData: Project[] = [
  {
    id: 1,
    title: 'Real Estate Pricing Prediction (ML)',
    description: 'Utilizing a pricing prediction for real estate using Gradient Boosting, while comparing with other models.',
    imageUrl: 'src/assets/images/machine-learning.png',
    technologies: ['Python', 'Jupyter Notebook', 'Streamlit'],
    link: 'https://github.com/JayLao27/realestate-pricing-prediction'
  },
  {
    id: 2,
    title: 'Text Messaging Motion Detection',
    description: 'Motion detection and text messaging system that detects motion.',
    imageUrl: 'src/assets/images/arduino.png',
    technologies: ['C++'],  
    link: 'https://github.com/JayLao27/PirMotion-GSMSim800L'
  },
  {
    id: 3,
    title: 'Wood Inventory Management System',
    description: 'A system designed for RM companies to efficiently manage stock and transactions. It provides accurate record-keeping, generates detailed reports, and ensures sustainable and organized inventory management.',
    imageUrl: 'src/assets/images/WebDevelopment.png',
    technologies: ['Laravel', 'PHP', 'MySQL'],
    link: 'https://github.com/JayLao27/wood-inventory-management'
  },
  {
    id: 4,
    title: 'Audio Library',
    description: 'A platform where users can browse, purchase, and stream music from artists. It allows users to create and manage playlists, add tracks to their collection, and explore a personal music library.',
    imageUrl: 'src/assets/images/audio-library.png',
    technologies: ['Java', 'JavaFX', 'CSS', 'MySQL'],
    link: '#'
  }
]

export const Projects: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
  return (
    <section
      id="projects"
      className="min-h-screen pt-32 px-[10%] pb-16 max-w-[1600px] mx-auto max-xl:px-[5%] max-md:pt-24 max-md:px-[5%] max-md:pb-12 relative"
    >
      <div className="mb-16">
        <h2
          className={`${isDarkMode ? 'text-tagline-text' : 'text-[#E1E8FF]'} text-[70px] font-[SF Compact] font-semibold mb-8 text-center max-md:text-[2.5rem]`}
        >
          Projects
        </h2>
      </div>

      {/* Scrollable Container */}
      <div className="overflow-x-auto pb-8">
        <div className="flex gap-8 min-w-max">
          {projectsData.map((project) => (
            <div
              key={project.id}
              className={`flex-shrink-0 w-[400px] p-6 rounded-lg transition-all duration-300 hover:shadow-lg ${
                isDarkMode
                  ? 'bg-gradient-to-br from-[rgba(136,146,176,0.2)] to-transparent border border-[rgba(136,146,176,0.2)] hover:border-[rgba(136,146,176,0.5)]'
                  : 'bg-gradient-to-br from-[rgba(10,43,47,0.1)] to-transparent border border-[rgba(10,43,47,0.1)] hover:border-[rgba(10,43,47,0.3)]'
              }`}
            >
              {/* Project Image Placeholder */}
              {project.imageUrl && (
                <div className="w-full h-[200px] rounded-lg mb-4 bg-gradient-to-br from-[rgba(136,146,176,0.3)] to-transparent overflow-hidden">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Project Content */}
              <h3
                className={`text-xl font-semibold mb-3 ${isDarkMode ? 'text-highlight' : 'text-[#E1E8FF]'}`}
              >
                {project.title}
              </h3>
              <p
                className={`text-sm mb-4 leading-relaxed ${isDarkMode ? 'text-body-text' : 'text-[#FFFFFF]'}`}
              >
                {project.description}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className={`text-xs px-3 py-1 rounded-full ${
                      isDarkMode
                        ? 'bg-[rgba(136,146,176,0.3)] text-[rgba(136,146,176,0.9)]'
                        : 'bg-[rgba(225,232,255,0.3)] text-[rgba(225,232,255,0.9)]'
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Project Link */}
              {project.link && (
                <a
                  href={project.link}
                  className={`inline-block text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 ${isDarkMode ? 'text-highlight hover:text-highlight' : 'text-[#1DD0A7] hover:text-[#1DD0A7]'}`}
                >
                  View Project →
                </a>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="text-center mt-8">
        <p className={`text-sm ${isDarkMode ? 'text-nav-text' : 'text-light-nav-text'}`}>
          Scroll horizontally to see more projects →
        </p>
      </div>
    </section>
  )
}
