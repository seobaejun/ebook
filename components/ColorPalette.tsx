'use client'

import { useState } from 'react'

export function ColorPalette() {
  const [showCode, setShowCode] = useState(false)
  const [copiedCSS, setCopiedCSS] = useState(false)
  const [copiedTailwind, setCopiedTailwind] = useState(false)
  const [copiedModalCSS, setCopiedModalCSS] = useState(false)
  const [copiedModalTailwind, setCopiedModalTailwind] = useState(false)

  const [baseColor, setBaseColor] = useState('#3B82F6')
  const [paletteType, setPaletteType] = useState<'complementary' | 'triadic' | 'analogous' | 'monochromatic'>('complementary')

  const generatePalette = () => {
    const hex = baseColor.replace('#', '')
    const r = parseInt(hex.slice(0, 2), 16)
    const g = parseInt(hex.slice(2, 4), 16)
    const b = parseInt(hex.slice(4, 6), 16)

    const hsl = rgbToHsl(r, g, b)
    const colors: string[] = []

    if (paletteType === 'complementary') {
      colors.push(baseColor)
      colors.push(hslToHex((hsl.h + 180) % 360, hsl.s, hsl.l))
    } else if (paletteType === 'triadic') {
      colors.push(baseColor)
      colors.push(hslToHex((hsl.h + 120) % 360, hsl.s, hsl.l))
      colors.push(hslToHex((hsl.h + 240) % 360, hsl.s, hsl.l))
    } else if (paletteType === 'analogous') {
      colors.push(hslToHex((hsl.h - 30 + 360) % 360, hsl.s, hsl.l))
      colors.push(baseColor)
      colors.push(hslToHex((hsl.h + 30) % 360, hsl.s, hsl.l))
    } else {
      // monochromatic
      colors.push(hslToHex(hsl.h, hsl.s, Math.max(0, hsl.l - 20)))
      colors.push(baseColor)
      colors.push(hslToHex(hsl.h, hsl.s, Math.min(100, hsl.l + 20)))
    }

    return colors
  }

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255
    g /= 255
    b /= 255
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h = 0, s = 0, l = (max + min) / 2

    if (max !== min) {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
        case g: h = ((b - r) / d + 2) / 6; break
        case b: h = ((r - g) / d + 4) / 6; break
      }
    }

    return { h: h * 360, s: s * 100, l: l * 100 }
  }

  const hslToHex = (h: number, s: number, l: number) => {
    s /= 100
    l /= 100
    const c = (1 - Math.abs(2 * l - 1)) * s
    const x = c * (1 - Math.abs((h / 60) % 2 - 1))
    const m = l - c / 2
    let r = 0, g = 0, b = 0

    if (0 <= h && h < 60) {
      r = c; g = x; b = 0
    } else if (60 <= h && h < 120) {
      r = x; g = c; b = 0
    } else if (120 <= h && h < 180) {
      r = 0; g = c; b = x
    } else if (180 <= h && h < 240) {
      r = 0; g = x; b = c
    } else if (240 <= h && h < 300) {
      r = x; g = 0; b = c
    } else if (300 <= h && h < 360) {
      r = c; g = 0; b = x
    }

    r = Math.round((r + m) * 255)
    g = Math.round((g + m) * 255)
    b = Math.round((b + m) * 255)

    return `#${[r, g, b].map(x => {
      const hex = x.toString(16)
      return hex.length === 1 ? '0' + hex : hex
    }).join('')}`
  }

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 }
  }

  const getContrastRatio = (color1: string, color2: string) => {
    const rgb1 = hexToRgb(color1)
    const rgb2 = hexToRgb(color2)
    
    const getLuminance = (r: number, g: number, b: number) => {
      const [rs, gs, bs] = [r, g, b].map(c => {
        c = c / 255
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
      })
      return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
    }

    const l1 = getLuminance(rgb1.r, rgb1.g, rgb1.b)
    const l2 = getLuminance(rgb2.r, rgb2.g, rgb2.b)
    const lighter = Math.max(l1, l2)
    const darker = Math.min(l1, l2)
    
    return ((lighter + 0.05) / (darker + 0.05)).toFixed(2)
  }

  const palette = generatePalette()

  const getCSSCode = () => {
    return palette.map((color, i) => `--color-${i + 1}: ${color};`).join('\n')
  }

  const getTailwindCode = () => {
    return palette.map((color, i) => `color${i + 1}: '${color}'`).join(',\n  ')
  }

  const copyCSSToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedCSS(true)
    setTimeout(() => setCopiedCSS(false), 2000)
  }

  const copyTailwindToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedTailwind(true)
    setTimeout(() => setCopiedTailwind(false), 2000)
  }

  const copyModalCSSToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedModalCSS(true)
    setTimeout(() => setCopiedModalCSS(false), 2000)
  }

  const copyModalTailwindToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedModalTailwind(true)
    setTimeout(() => setCopiedModalTailwind(false), 2000)
  }

  return (
    <section className="relative w-[calc(100%-16rem)] min-h-screen bg-gray-900 py-20 pt-8 ml-64">
      <div className="max-w-7xl mx-auto px-5">
        <h2 className="text-4xl font-bold text-center mb-6 text-white">
          Color Palette
        </h2>

        {/* 설명 섹션 */}
        <div className="max-w-7xl mx-auto mb-12">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-white text-lg font-semibold mb-4">색상 팔레트 생성</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300 text-sm">
              <div className="bg-gray-700/50 rounded p-4">
                <h4 className="text-indigo-400 font-semibold mb-2">조화 색상</h4>
                <p className="text-xs leading-relaxed">
                  <span className="text-yellow-400">Complementary</span> (보색), <span className="text-yellow-400">Triadic</span> (삼원색),
                  <span className="text-yellow-400">Analogous</span> (유사색) 조합을 생성합니다.
                </p>
              </div>
              
              <div className="bg-gray-700/50 rounded p-4">
                <h4 className="text-indigo-400 font-semibold mb-2">대비 확인</h4>
                <p className="text-xs leading-relaxed">
                  색상 간 <span className="text-yellow-400">대비 비율</span>을 계산하여
                  접근성 기준을 확인할 수 있습니다.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 왼쪽: 설정 패널 */}
          <div className="space-y-6">
            {/* 기본 색상 */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-gray-300 text-sm font-semibold mb-3">기본 색상</h3>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={baseColor}
                  onChange={(e) => setBaseColor(e.target.value)}
                  className="w-16 h-16 rounded cursor-pointer flex-shrink-0"
                />
                <input
                  type="text"
                  value={baseColor}
                  onChange={(e) => setBaseColor(e.target.value)}
                  className="flex-1 bg-gray-700 text-gray-200 rounded px-2 py-1 text-sm"
                />
              </div>
            </div>

            {/* 팔레트 타입 */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-gray-300 text-sm font-semibold mb-3">팔레트 타입</h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setPaletteType('complementary')}
                  className={`px-4 py-2 rounded transition-colors ${
                    paletteType === 'complementary'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  Complementary
                </button>
                <button
                  onClick={() => setPaletteType('triadic')}
                  className={`px-4 py-2 rounded transition-colors ${
                    paletteType === 'triadic'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  Triadic
                </button>
                <button
                  onClick={() => setPaletteType('analogous')}
                  className={`px-4 py-2 rounded transition-colors ${
                    paletteType === 'analogous'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  Analogous
                </button>
                <button
                  onClick={() => setPaletteType('monochromatic')}
                  className={`px-4 py-2 rounded transition-colors ${
                    paletteType === 'monochromatic'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  Monochromatic
                </button>
              </div>
            </div>
          </div>

          {/* 오른쪽: 미리보기 */}
          <div className="w-full">
            <div className="w-full">
              <div className="bg-gray-800 rounded-lg p-6 mb-4">
                <h4 className="text-white text-lg font-semibold mb-2">생성된 팔레트</h4>
                <p className="text-gray-400 text-sm">조화로운 색상 조합을 확인하세요</p>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-8 w-full min-h-[400px] flex flex-col gap-4">
                {palette.map((color, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div
                      className="w-24 h-24 rounded-lg flex-shrink-0"
                      style={{ backgroundColor: color }}
                    />
                    <div className="flex-1">
                      <p className="text-white font-semibold mb-1">{color}</p>
                      <p className="text-gray-400 text-sm">
                        대비 비율 (흰색): {getContrastRatio(color, '#FFFFFF')}:1
                      </p>
                      <p className="text-gray-400 text-sm">
                        대비 비율 (검은색): {getContrastRatio(color, '#000000')}:1
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* 프리셋 설정 */}
              <div className="mt-4 bg-gray-800 rounded-lg p-6 min-h-[200px] flex flex-col">
                <h4 className="text-white text-lg font-semibold mb-4">프리셋 설정</h4>
                <p className="text-gray-400 text-sm mb-6">원하는 효과를 선택하면 예시 값이 자동으로 입력됩니다</p>
                <div className="flex flex-col gap-4 flex-1">
                  <button
                    onClick={() => {
                      setBaseColor('#3B82F6')
                      setPaletteType('complementary')
                    }}
                    className="w-full px-6 py-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-xl text-left flex-1 flex flex-col justify-center"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-lg mb-1">보색 조합</p>
                        <p className="text-sm text-indigo-200">대비가 강한 색상 조합</p>
                      </div>
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      setBaseColor('#10B981')
                      setPaletteType('triadic')
                    }}
                    className="w-full px-6 py-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-xl text-left flex-1 flex flex-col justify-center"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-lg mb-1">삼원색 조합</p>
                        <p className="text-sm text-indigo-200">균형잡힌 색상 조합</p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CSS 코드 표시 */}
        <div className="max-w-7xl mx-auto px-5 mt-12 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white text-sm font-semibold">CSS 변수</h4>
                <button
                  onClick={() => copyCSSToClipboard(getCSSCode())}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded transition-colors"
                >
                  {copiedCSS ? '복사됨!' : '복사'}
                </button>
              </div>
              <pre className="text-xs text-gray-300 overflow-x-auto">
                <code>{getCSSCode()}</code>
              </pre>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white text-sm font-semibold">색상 값</h4>
                <button
                  onClick={() => copyTailwindToClipboard(getTailwindCode())}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded transition-colors"
                >
                  {copiedTailwind ? '복사됨!' : '복사'}
                </button>
              </div>
              <pre className="text-xs text-gray-300 overflow-x-auto">
                <code>{getTailwindCode()}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* 완료 버튼 */}
        <div className="max-w-4xl mx-auto mb-24 flex justify-center">
          <button
            onClick={() => { 
              setShowCode(true)
              setCopiedModalCSS(false)
              setCopiedModalTailwind(false)
            }}
            className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-xl"
          >
            완료 및 코드 확인
          </button>
        </div>

        {/* Final Code Modal */}
        {showCode && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-700 flex justify-between items-center">
                <h3 className="text-white text-xl font-semibold">생성된 코드</h3>
                <button
                  onClick={() => setShowCode(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-semibold">CSS 변수</h4>
                    <button
                      onClick={() => copyModalCSSToClipboard(getCSSCode())}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded transition-colors"
                    >
                      {copiedModalCSS ? '복사됨!' : '복사'}
                    </button>
                  </div>
                  <pre className="bg-gray-900 rounded p-4 text-xs text-gray-300 overflow-x-auto">
                    <code>{getCSSCode()}</code>
                  </pre>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-semibold">색상 값</h4>
                    <button
                      onClick={() => copyModalTailwindToClipboard(getTailwindCode())}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded transition-colors"
                    >
                      {copiedModalTailwind ? '복사됨!' : '복사'}
                    </button>
                  </div>
                  <pre className="bg-gray-900 rounded p-4 text-xs text-gray-300 overflow-x-auto">
                    <code>{getTailwindCode()}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

