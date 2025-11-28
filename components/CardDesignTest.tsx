'use client'

import { useState } from 'react'

interface ShadowConfig {
  enabled: boolean
  x: number
  y: number
  blur: number
  spread: number
  color: string
  opacity: number
}

export function CardDesignTest() {
  const [showCode, setShowCode] = useState(false)
  const [copiedCSS, setCopiedCSS] = useState(false)
  const [copiedTailwind, setCopiedTailwind] = useState(false)
  const [copiedModalCSS, setCopiedModalCSS] = useState(false)
  const [copiedModalTailwind, setCopiedModalTailwind] = useState(false)
  const [copiedModalFull, setCopiedModalFull] = useState(false)
  
  const [innerShadow1, setInnerShadow1] = useState<ShadowConfig>({
    enabled: true,
    x: -30,
    y: -30,
    blur: 80,
    spread: 0,
    color: '#000000',
    opacity: 100
  })

  const [innerShadow2, setInnerShadow2] = useState<ShadowConfig>({
    enabled: true,
    x: 30,
    y: 29,
    blur: 80,
    spread: 0,
    color: '#CCD4D7',
    opacity: 100
  })

  const [outerShadow1, setOuterShadow1] = useState<ShadowConfig>({
    enabled: true,
    x: 30,
    y: 30,
    blur: 80,
    spread: 0,
    color: '#000000',
    opacity: 100
  })

  const [outerShadow2, setOuterShadow2] = useState<ShadowConfig>({
    enabled: true,
    x: -30,
    y: -30,
    blur: 80,
    spread: 0,
    color: '#FFFFFF',
    opacity: 14
  })

  const updateShadow = (
    setter: React.Dispatch<React.SetStateAction<ShadowConfig>>,
    field: keyof ShadowConfig,
    value: any
  ) => {
    setter(prev => ({ ...prev, [field]: value }))
  }

  const resetShadow = (setter: React.Dispatch<React.SetStateAction<ShadowConfig>>, defaultValues: ShadowConfig) => {
    setter(defaultValues)
  }

  const closeShadow = (setter: React.Dispatch<React.SetStateAction<ShadowConfig>>) => {
    setter(prev => ({ ...prev, enabled: false }))
  }

  const getShadowStyle = (shadow: ShadowConfig, isInner: boolean) => {
    if (!shadow.enabled) return ''
    
    const rgba = hexToRgba(shadow.color, shadow.opacity / 100)
    const prefix = isInner ? 'inset' : ''
    return `${prefix} ${shadow.x}px ${shadow.y}px ${shadow.blur}px ${shadow.spread}px ${rgba}`
  }

  const hexToRgba = (hex: string, opacity: number) => {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return `rgba(${r}, ${g}, ${b}, ${opacity})`
  }

  const getCardBoxShadow = () => {
    const shadows: string[] = []
    
    if (innerShadow1.enabled) {
      shadows.push(getShadowStyle(innerShadow1, true))
    }
    if (innerShadow2.enabled) {
      shadows.push(getShadowStyle(innerShadow2, true))
    }
    if (outerShadow1.enabled) {
      shadows.push(getShadowStyle(outerShadow1, false))
    }
    if (outerShadow2.enabled) {
      shadows.push(getShadowStyle(outerShadow2, false))
    }
    
    return shadows.join(', ')
  }

  const ShadowPanel = ({
    title,
    shadow,
    setShadow,
    defaultValues
  }: {
    title: string
    shadow: ShadowConfig
    setShadow: React.Dispatch<React.SetStateAction<ShadowConfig>>
    defaultValues: ShadowConfig
  }) => {
    return (
      <div className="bg-gray-800 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <label className="flex items-center gap-2 text-gray-300 text-sm">
            <input
              type="checkbox"
              checked={shadow.enabled}
              onChange={(e) => updateShadow(setShadow, 'enabled', e.target.checked)}
              className="w-4 h-4 rounded"
            />
            <span>{title}</span>
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => resetShadow(setShadow, defaultValues)}
              className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-200 transition-colors"
              title="Reset"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="1" fill="currentColor" />
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>
            <button
              onClick={() => closeShadow(setShadow)}
              className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-200 transition-colors"
              title="Close"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-gray-400 mb-1">Position X</label>
            <input
              type="number"
              value={shadow.x}
              onChange={(e) => updateShadow(setShadow, 'x', parseInt(e.target.value) || 0)}
              className="w-full bg-gray-700 text-gray-200 rounded px-2 py-1 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">Position Y</label>
            <input
              type="number"
              value={shadow.y}
              onChange={(e) => updateShadow(setShadow, 'y', parseInt(e.target.value) || 0)}
              className="w-full bg-gray-700 text-gray-200 rounded px-2 py-1 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">Blur</label>
            <input
              type="number"
              value={shadow.blur}
              onChange={(e) => updateShadow(setShadow, 'blur', parseInt(e.target.value) || 0)}
              className="w-full bg-gray-700 text-gray-200 rounded px-2 py-1 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">Spread</label>
            <input
              type="number"
              value={shadow.spread}
              onChange={(e) => updateShadow(setShadow, 'spread', parseInt(e.target.value) || 0)}
              className="w-full bg-gray-700 text-gray-200 rounded px-2 py-1 text-sm"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-xs text-gray-400 mb-1">Color</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={shadow.color}
                onChange={(e) => updateShadow(setShadow, 'color', e.target.value)}
                className="w-8 h-8 rounded cursor-pointer flex-shrink-0"
              />
              <input
                type="text"
                value={shadow.color}
                onChange={(e) => updateShadow(setShadow, 'color', e.target.value)}
                className="flex-1 bg-gray-700 text-gray-200 rounded px-2 py-1 text-sm min-w-0"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">Opacity (%)</label>
            <input
              type="number"
              min="0"
              max="100"
              value={shadow.opacity}
              onChange={(e) => updateShadow(setShadow, 'opacity', parseInt(e.target.value) || 0)}
              className="w-full bg-gray-700 text-gray-200 rounded px-2 py-1 text-sm"
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <section className="relative w-[calc(100%-16rem)] min-h-screen bg-gray-900 py-20 pt-8 ml-64">
      <div className="max-w-7xl mx-auto px-5">
        <h2 className="text-4xl font-bold text-center mb-6 text-white">
          Box Shadow Designer
        </h2>

        {/* 설명 섹션 - 항상 표시 */}
        <div className="max-w-7xl mx-auto mb-12">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-white text-lg font-semibold mb-4">다중 그림자를 활용한 3D 효과 구현</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300 text-sm">
              <div className="bg-gray-700/50 rounded p-4">
                <h4 className="text-indigo-400 font-semibold mb-2">Inner Shadow</h4>
                <p className="text-xs leading-relaxed">
                  어두운 그림자 + 밝은 하이라이트를 조합하여 <span className="text-yellow-400">오목한 버튼</span> 효과 구현
                </p>
              </div>
              
              <div className="bg-gray-700/50 rounded p-4">
                <h4 className="text-indigo-400 font-semibold mb-2">Outer Shadow</h4>
                <p className="text-xs leading-relaxed">
                  어두운 그림자 + 밝은 하이라이트를 조합하여 <span className="text-yellow-400">볼록한 카드</span> 효과 구현
                </p>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-700">
              <p className="text-xs text-gray-400">
                <strong className="text-white">핵심 원리:</strong> 단일 광원을 가정하여 빛을 받는 면은 밝게, 받지 않는 면은 어둡게 표현하여 입체적인 3D 효과를 구현합니다.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 왼쪽: 설정 패널 */}
          <div className="space-y-6">
            {/* Inner Shadow 섹션 */}
            <div>
              <h3 className="text-gray-300 text-lg font-semibold mb-2">Inner shadow</h3>
              <p className="text-gray-400 text-xs mb-4">내부 그림자: 오목한 효과 (어두운 그림자 + 밝은 하이라이트)</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-500 text-xs mb-2">1️⃣ 어두운 그림자 (왼쪽 위)</p>
                  <ShadowPanel
                    title="Inner shadow"
                    shadow={innerShadow1}
                    setShadow={setInnerShadow1}
                    defaultValues={{
                      enabled: true,
                      x: -30,
                      y: -30,
                      blur: 80,
                      spread: 0,
                      color: '#000000',
                      opacity: 100
                    }}
                  />
                </div>
                <div>
                  <p className="text-gray-500 text-xs mb-2">2️⃣ 밝은 하이라이트 (오른쪽 아래)</p>
                  <ShadowPanel
                    title="Inner shadow"
                    shadow={innerShadow2}
                    setShadow={setInnerShadow2}
                    defaultValues={{
                      enabled: true,
                      x: 30,
                      y: 29,
                      blur: 80,
                      spread: 0,
                      color: '#CCD4D7',
                      opacity: 100
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Outer Shadow 섹션 */}
            <div>
              <h3 className="text-gray-300 text-lg font-semibold mb-2">outer shadow</h3>
              <p className="text-gray-400 text-xs mb-4">외부 그림자: 볼록한 효과 (어두운 그림자 + 밝은 하이라이트)</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-500 text-xs mb-2">1️⃣ 어두운 그림자 (오른쪽 아래)</p>
                  <ShadowPanel
                    title="Drop shadow"
                    shadow={outerShadow1}
                    setShadow={setOuterShadow1}
                    defaultValues={{
                      enabled: true,
                      x: 30,
                      y: 30,
                      blur: 80,
                      spread: 0,
                      color: '#000000',
                      opacity: 100
                    }}
                  />
                </div>
                <div>
                  <p className="text-gray-500 text-xs mb-2">2️⃣ 밝은 하이라이트 (왼쪽 위)</p>
                  <ShadowPanel
                    title="Drop shadow"
                    shadow={outerShadow2}
                    setShadow={setOuterShadow2}
                    defaultValues={{
                      enabled: true,
                      x: -30,
                      y: -30,
                      blur: 80,
                      spread: 0,
                      color: '#FFFFFF',
                      opacity: 14
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 오른쪽: 미리보기 */}
          <div className="w-full">
            <div className="w-full">
              <div className="bg-gray-800 rounded-lg p-6 mb-4">
                <h4 className="text-white text-lg font-semibold mb-2">실시간 미리보기</h4>
                <p className="text-gray-400 text-sm">설정한 값이 실시간으로 반영됩니다</p>
              </div>
              
              <div
                className="bg-gray-700 rounded-lg p-8 w-full h-64 flex items-center justify-center transition-all"
                style={{
                  boxShadow: getCardBoxShadow() || 'none'
                }}
              >
                <div className="text-center">
                  <p className="text-white text-xl font-semibold mb-2">카드 예시</p>
                  <p className="text-gray-300 text-sm">그림자 효과를 확인하세요</p>
                </div>
              </div>

              {/* 프리셋 설정 - 카드 예시 바로 밑 */}
              <div className="mt-4 bg-gray-800 rounded-lg p-6 min-h-[200px] flex flex-col">
                <h4 className="text-white text-lg font-semibold mb-4">프리셋 설정</h4>
                <p className="text-gray-400 text-sm mb-6">원하는 효과를 선택하면 예시 값이 자동으로 입력됩니다</p>
                <div className="flex flex-col gap-4 flex-1">
                  <button
                    onClick={() => {
                      // 오목해지는 효과: Inner shadow 위주
                      setInnerShadow1({
                        enabled: true,
                        x: -30,
                        y: -30,
                        blur: 80,
                        spread: 0,
                        color: '#000000',
                        opacity: 100
                      })
                      setInnerShadow2({
                        enabled: true,
                        x: 30,
                        y: 29,
                        blur: 80,
                        spread: 0,
                        color: '#CCD4D7',
                        opacity: 100
                      })
                      // Outer shadow는 비활성화
                      setOuterShadow1({
                        enabled: false,
                        x: 30,
                        y: 30,
                        blur: 80,
                        spread: 0,
                        color: '#000000',
                        opacity: 100
                      })
                      setOuterShadow2({
                        enabled: false,
                        x: -30,
                        y: -30,
                        blur: 80,
                        spread: 0,
                        color: '#FFFFFF',
                        opacity: 14
                      })
                    }}
                    className="w-full px-6 py-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-xl text-left flex-1 flex flex-col justify-center"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-lg mb-1">오목해지는 셋팅</p>
                        <p className="text-sm text-indigo-200">Inner Shadow 위주로 오목한 효과</p>
                      </div>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      // 볼록해지는 효과: Outer shadow 위주
                      setOuterShadow1({
                        enabled: true,
                        x: 30,
                        y: 30,
                        blur: 80,
                        spread: 0,
                        color: '#000000',
                        opacity: 100
                      })
                      setOuterShadow2({
                        enabled: true,
                        x: -30,
                        y: -30,
                        blur: 80,
                        spread: 0,
                        color: '#FFFFFF',
                        opacity: 14
                      })
                      // Inner shadow는 비활성화
                      setInnerShadow1({
                        enabled: false,
                        x: -30,
                        y: -30,
                        blur: 80,
                        spread: 0,
                        color: '#000000',
                        opacity: 100
                      })
                      setInnerShadow2({
                        enabled: false,
                        x: 30,
                        y: 29,
                        blur: 80,
                        spread: 0,
                        color: '#CCD4D7',
                        opacity: 100
                      })
                    }}
                    className="w-full px-6 py-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-xl text-left flex-1 flex flex-col justify-center"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-lg mb-1">볼록해지는 셋팅</p>
                        <p className="text-sm text-indigo-200">Outer Shadow 위주로 볼록한 효과</p>
                      </div>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                      </svg>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CSS 코드 표시 - 버튼 바로 위 */}
        <div className="max-w-7xl mx-auto px-5 mt-12 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 왼쪽: CSS 코드 */}
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white text-sm font-semibold">CSS 코드</h4>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`box-shadow: ${getCardBoxShadow() || 'none'};`)
                    setCopiedCSS(true)
                    setTimeout(() => setCopiedCSS(false), 2000)
                  }}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded transition-colors"
                >
                  {copiedCSS ? '복사됨!' : '복사'}
                </button>
              </div>
              <pre className="text-xs text-gray-300 overflow-x-auto">
                <code>{`box-shadow: ${getCardBoxShadow() || 'none'};`}</code>
              </pre>
            </div>

            {/* 오른쪽: Tailwind CSS 코드 */}
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white text-sm font-semibold">Tailwind CSS (인라인 스타일)</h4>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`style={{ boxShadow: '${getCardBoxShadow() || 'none'}' }}`)
                    setCopiedTailwind(true)
                    setTimeout(() => setCopiedTailwind(false), 2000)
                  }}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded transition-colors"
                >
                  {copiedTailwind ? '복사됨!' : '복사'}
                </button>
              </div>
              <pre className="text-xs text-gray-300 overflow-x-auto">
                <code>{`style={{ boxShadow: '${getCardBoxShadow() || 'none'}' }}`}</code>
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
              setCopiedModalFull(false)
            }}
            className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-xl"
          >
            완료 및 코드 확인
          </button>
        </div>

        {/* 최종 코드 모달 */}
        {showCode && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-white">완성된 코드</h3>
                  <button
                    onClick={() => setShowCode(false)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* CSS 코드 */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-semibold">CSS 코드</h4>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(`box-shadow: ${getCardBoxShadow() || 'none'};`)
                        setCopiedModalCSS(true)
                        setTimeout(() => setCopiedModalCSS(false), 2000)
                      }}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded transition-colors"
                    >
                      {copiedModalCSS ? '복사됨!' : '복사'}
                    </button>
                  </div>
                  <div className="bg-gray-900 rounded-lg p-4">
                    <pre className="text-sm text-gray-300 overflow-x-auto">
                      <code>{`box-shadow: ${getCardBoxShadow() || 'none'};`}</code>
                    </pre>
                  </div>
                </div>

                {/* React/JSX 코드 */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-semibold">React/JSX 코드</h4>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(`style={{ boxShadow: '${getCardBoxShadow() || 'none'}' }}`)
                        setCopiedModalTailwind(true)
                        setTimeout(() => setCopiedModalTailwind(false), 2000)
                      }}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded transition-colors"
                    >
                      {copiedModalTailwind ? '복사됨!' : '복사'}
                    </button>
                  </div>
                  <div className="bg-gray-900 rounded-lg p-4">
                    <pre className="text-sm text-gray-300 overflow-x-auto">
                      <code>{`style={{ boxShadow: '${getCardBoxShadow() || 'none'}' }}`}</code>
                    </pre>
                  </div>
                </div>

                {/* Tailwind CSS 클래스 (커스텀 스타일 필요) */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-semibold">Tailwind CSS (인라인 스타일)</h4>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(`style={{ boxShadow: '${getCardBoxShadow() || 'none'}' }}`)
                        setCopiedModalTailwind(true)
                        setTimeout(() => setCopiedModalTailwind(false), 2000)
                      }}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded transition-colors"
                    >
                      {copiedModalTailwind ? '복사됨!' : '복사'}
                    </button>
                  </div>
                  <div className="bg-gray-900 rounded-lg p-4">
                    <pre className="text-sm text-gray-300 overflow-x-auto">
                      <code>{`<div className="..." style={{ boxShadow: '${getCardBoxShadow() || 'none'}' }}>`}</code>
                    </pre>
                  </div>
                </div>

                {/* 전체 컴포넌트 예시 */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-semibold">전체 컴포넌트 예시</h4>
                    <button
                      onClick={() => {
                        const fullCode = `<div className="bg-gray-700 rounded-lg p-8" style={{ boxShadow: '${getCardBoxShadow() || 'none'}' }}>
  <p className="text-white">카드 내용</p>
</div>`
                        navigator.clipboard.writeText(fullCode)
                        setCopiedModalFull(true)
                        setTimeout(() => setCopiedModalFull(false), 2000)
                      }}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded transition-colors"
                    >
                      {copiedModalFull ? '복사됨!' : '복사'}
                    </button>
                  </div>
                  <div className="bg-gray-900 rounded-lg p-4">
                    <pre className="text-sm text-gray-300 overflow-x-auto">
                      <code>{`<div className="bg-gray-700 rounded-lg p-8" style={{ boxShadow: '${getCardBoxShadow() || 'none'}' }}>
  <p className="text-white">카드 내용</p>
</div>`}</code>
                    </pre>
                  </div>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                  <button
                    onClick={() => setShowCode(false)}
                    className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors"
                  >
                    닫기
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

