import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Experience } from '@/components/sections/Experience'
import { Projects } from '@/components/sections/Projects'
import { Stack } from '@/components/sections/Stack'
import { Certifications } from '@/components/sections/Certifications'
import { Contact } from '@/components/sections/Contact'
import { getProjects } from '@/lib/getProjects'
import { getExperience } from '@/lib/getExperience'
import { getCertifications, getStack } from '@/lib/getGlobals'

export const revalidate = 60

export default async function HomePage() {
  const [projects, experience, certifications, stack] = await Promise.all([
    getProjects({ limit: 6 }),
    getExperience(),
    getCertifications(),
    getStack(),
  ])

  return (
    <>
      <Hero />
      <About />
      <Experience data={experience.length > 0 ? experience : undefined} />
      <Projects data={projects.length > 0 ? projects : undefined} />
      <Stack data={stack.length > 0 ? stack : undefined} />
      <Certifications data={certifications.length > 0 ? certifications : undefined} />
      <Contact />
    </>
  )
}
