import React from 'react'
import { MinimalLayout } from 'src/components/layout/MinimalLayout'
import type { ComponentBaseProps } from 'src/types'

interface AboutPageProps extends ComponentBaseProps {}

const AboutPage: React.FC<AboutPageProps> = ({ className = '', style }) => {
  const companyName = 'FurryDelight'
  const missionStatement =
    'To provide the healthiest and most delicious cat food, ensuring the happiness and well-being of every feline friend.'
  const history = `FurryDelight was founded in 2010 by a group of passionate cat lovers who wanted to revolutionize the pet food industry.
  We started with a small kitchen and a big dream, and today we're proud to serve cats all over the world.`
  const teamMembers = [
    { name: 'Alice Johnson', title: 'CEO' },
    { name: 'Bob Williams', title: 'Head Nutritionist' },
    { name: 'Charlie Brown', title: 'Marketing Director' }
  ]

  return (
    <MinimalLayout showBackButton backButtonHref="/">
      <div className={`about-page ${className}`} style={style}>
        <section className="bg-white py-16 px-4">
          <div className="container mx-auto max-w-3xl">
            <h1 className="text-3xl font-semibold text-gray-800 mb-8">About {companyName}</h1>
            <p className="text-gray-700 text-lg mb-6">{missionStatement}</p>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Story</h2>
            <p className="text-gray-700 text-lg mb-6">{history}</p>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Team</h2>
            <ul className="space-y-4">
              {teamMembers.map((member, index) => (
                <li key={index} className="text-gray-700">
                  <span className="font-semibold">{member.name}</span> - {member.title}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </MinimalLayout>
  )
}

export default AboutPage