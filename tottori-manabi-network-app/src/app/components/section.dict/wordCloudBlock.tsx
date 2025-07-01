'use client'

import React, { useEffect, useRef } from 'react'
import cloud, { Word } from 'd3-cloud'
import * as d3 from 'd3'

interface KeywordItem {
  id: string
  keyword: string
}

interface WordCloudCanvasProps {
  keywords: (KeywordItem | string)[]
}

const WordCloudCanvas: React.FC<WordCloudCanvasProps> = ({ keywords }) => {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    const words: Word[] = keywords.map((item, index, array) => {
      const text = typeof item === 'string' ? item : item.keyword
      return {
        text,
        value: (array.length - index) * 10 + index * 3,
      }
    })

    const width = 300
    const height = 200

    const layout = cloud<Word>()
      .size([width, height])
      .words(words)
      .padding(5)
      .rotate(() => 0)
      .font('Zen Kaku Gothic New')
      .fontSize((d) => d.value as number)
      .on('end', draw)

    layout.start()

    function draw(words: Word[]) {
      const svg = d3
        .select(svgRef.current as EventTarget)
        .attr('width', width)
        .attr('height', height)

      svg.selectAll('*').remove()

      const group = svg.append('g').attr('transform', `translate(${width / 2},${height / 2})`)

      group
        .selectAll('text')
        .data(words)
        .enter()
        .append('text')
        .style('font-size', (d) => `${d.size}px`)
        .style('fill', () => d3.schemeCategory10[Math.floor(Math.random() * 10)])
        .attr('text-anchor', 'middle')
        .attr('transform', (d) => `translate(${d.x},${d.y}) rotate(${d.rotate})`)
        .text((d) => d.text)
    }
  }, [keywords])

  return <svg ref={svgRef} className="border-4" />
}

export default WordCloudCanvas
