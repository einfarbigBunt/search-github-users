import React from 'react'
import styled from 'styled-components'
import { GithubContext } from '../context/context'
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts'
const Repos = () => {
  const { repos } = React.useContext(GithubContext)
  // console.log(repos)

  let languages = repos.reduce((total, item) => {
    // console.log(item)
    const { language, stargazers_count } = item
    if (!language) return total
    if (!total[language]) {
      total[language] = { label: language, value: 1, stars: stargazers_count }
    } else {
      total[language] = {
        ...total[language],
        value: total[language].value + 1,
        stars: total[language].stars + stargazers_count,
      }
    }
    return total
  }, {})

  // console.log(languages)
  //turning an object into an array
  //and then sorting: highers value first
  //with slich I get the most popular 5 languages
  const mostUsed = Object.values(languages)
    .sort((a, b) => {
      return b.value - a.value
    })
    .slice(0, 5)
  // console.log(mostUsed)

  //most stars per language
  //sort based on stars
  //overriding the value property cause its neccessary for the chart

  const mostPopular = Object.values(languages)
    .sort((a, b) => {
      return b.stars - a.stars
    })
    .map((item) => {
      return { ...item, value: item.stars }
    })
    .slice(0, 5)

  // console.log(mostPopular)

  // stars, forks

  let { stars, forks } = repos.reduce(
    (total, item) => {
      // console.log(item)
      const { stargazers_count, name, forks } = item
      // console.log(stargazers_count)
      total.stars[stargazers_count] = { label: name, value: stargazers_count }
      total.forks[forks] = { label: name, value: forks }
      // console.log(total)
      return total
    },
    {
      stars: {},
      forks: {},
    }
  )
  // console.log(stars)
  stars = Object.values(stars).slice(-5).reverse()
  forks = Object.values(forks).slice(-5).reverse()
  // console.log(stars)
  // console.log(forks)

  return (
    <section className='section'>
      <Wrapper className='section-center'>
        <Pie3D data={mostUsed} />
        <Column3D data={stars} />
        <Doughnut2D data={mostPopular} />
        <Bar3D data={forks} />
      </Wrapper>
    </section>
  )
}

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }
  // responsiveness of the chart by using !important
  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`

export default Repos
