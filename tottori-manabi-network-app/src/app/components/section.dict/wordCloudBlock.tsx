'use client'

import React, { useEffect, useRef } from 'react'
import cloud from 'd3-cloud'
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

    // keyword を正しく取得（string型対応も）
    const words = keywords.map((item, index, array) => {
      const text = typeof item === 'string' ? item : item.keyword
      return {
        text,
        value: (array.length - index) * 10 + index * 3, // 大きさを調整
      }
    })

    const width = 300
    const height = 200

    const layout = cloud<(typeof words)[0]>()
      .size([width, height])
      .words(words)
      .padding(5)
      .rotate(() => 0)
      .font('Zen Kaku Gothic New')
      .fontSize((d) => d.value)
      .on('end', draw)

    layout.start()

    function draw(words: any[]) {
      const svg = d3.select(svgRef.current).attr('width', width).attr('height', height)

      svg.selectAll('*').remove() // clear previous

      const group = svg.append('g').attr('transform', `translate(${width / 2},${height / 2})`) // 中央に配置

      group
        .selectAll('text')
        .data(words)
        .enter()
        .append('text')
        .style('font-size', (d: any) => `${d.size}px`)
        .style('fill', () => d3.schemeCategory10[Math.floor(Math.random() * 10)])
        .attr('text-anchor', 'middle')
        .attr('transform', (d: any) => `translate(${d.x},${d.y}) rotate(${d.rotate})`)
        .text((d: any) => d.text)
    }
  }, [keywords])

  return <svg ref={svgRef} className="border-4" />
}

export default WordCloudCanvas
