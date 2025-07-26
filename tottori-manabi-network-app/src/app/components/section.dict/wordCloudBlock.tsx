'use client'

import React, { useEffect, useRef, useState } from 'react'
import cloud, { Word } from 'd3-cloud'
import * as d3 from 'd3'
import { scaleSqrt } from 'd3-scale'
import { schemeCategory10 } from 'd3-scale-chromatic'

// (interface定義は変更なし)
interface KeywordItem {
  id: string
  keyword: string
}
interface MyWord extends Word {
  value: number
}
interface WordCloudCanvasProps {
  keywords: (KeywordItem | string)[]
}

const WordCloudCanvas: React.FC<WordCloudCanvasProps> = ({ keywords }) => {
  const svgRef = useRef<SVGSVGElement>(null)
  const [size, setSize] = useState({ width: 0, height: 200 })

  useEffect(() => {
    if (!svgRef.current || !svgRef.current.parentElement) return
    const container = svgRef.current.parentElement
    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return
      const { width } = entries[0].contentRect
      setSize({ width, height: 200 })
    })
    resizeObserver.observe(container)
    return () => resizeObserver.disconnect()
  }, [])

  useEffect(() => {
    if (!svgRef.current || keywords.length === 0 || size.width === 0) return
    const { width, height } = size

    const words: MyWord[] = keywords.map((item, index, array) => {
      const text = typeof item === 'string' ? item : item.keyword
      return {
        text,
        value: array.length - index,
      }
    })

    const valueExtent = d3.extent(words, (d) => d.value) as [number, number]

    // --- 💡ここからが動的調整のロジック ---

    // 1. 単語数に応じて「最大フォントサイズ」を調整
    // 単語が少ない -> 除数が小さい -> 文字が大きい
    // 単語が多い   -> 除数が大きい -> 文字が小さい
    const divisor = 1.5 + keywords.length
    const maxFontSize = Math.min(width / divisor, 80)

    // 2. 単語数に応じて「最小フォントサイズ」を調整
    // 単語が少ない -> 最小値が大きい (例: 30px)
    // 単語が多い   -> 最小値が小さい (例: 10px)
    const dynamicMinFontSize = 30 - keywords.length * 2
    const minFontSize = Math.max(10, Math.min(30, dynamicMinFontSize))

    // 3. 計算した動的なフォントサイズを適用
    const fontSizeScale = scaleSqrt().domain(valueExtent).range([minFontSize, maxFontSize])

    // --- 調整ここまで ---

    const layout = cloud<MyWord>()
      .size([width, height])
      .words(words)
      .padding(3)
      .rotate(() => 0)
      .font('YuGothic')
      .fontSize((d) => fontSizeScale(d.value))
      .on('end', draw)

    layout.start()

    function draw(drawnWords: MyWord[]) {
      const softColors = [
        '#EF5350', // 濃いめの赤（あたたかく情熱的）
        '#F06292', // ピンク（柔らかく親しみやすい）
        '#F57C00', // 濃いオレンジ（活発で目立つ）
        '#FF8A65', // サーモンピンク（明るいけど落ち着きあり）
        '#F9A825', // マスタードイエロー（黄色系の中で視認性が高い）
        '#FFB74D', // 明るめのオレンジ（元気・親しみやすさ）
        '#E57373', // ローズ系の赤（派手すぎない赤）
        '#FF7043', // コーラル系オレンジ（フレンドリー）
        '#FFB6B9', // ピンクベージュ（淡さと優しさのバランス）
        '#FFA726', // やや濃いアプリコット（安心感）
      ]

      const svg = d3.select(svgRef.current!).attr('width', width).attr('height', height)
      svg.selectAll('*').remove()
      const g = svg.append('g').attr('transform', `translate(${width / 2},${height / 2})`)
      g.selectAll('text')
        .data(drawnWords)
        .enter()
        .append('text')
        .style('font-size', (d) => `${d.size}px`)
        .style('font-family', 'YuGothic')
        .style('fill', () => softColors[Math.floor(Math.random() * softColors.length)])
        .attr('text-anchor', 'middle')
        .attr('transform', (d) => `translate(${d.x}, ${d.y}) rotate(${d.rotate})`)
        .text((d) => d.text ?? '')
    }
  }, [keywords, size])

  return <svg ref={svgRef} className="border-4" />
}

export default WordCloudCanvas
