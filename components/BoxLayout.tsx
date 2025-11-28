'use client'

import { useState } from 'react'
import type { CSSProperties } from 'react'

interface BoxConfig {
  width: number
  height: number
  paddingTop: number
  paddingRight: number
  paddingBottom: number
  paddingLeft: number
  marginTop: number
  marginRight: number
  marginBottom: number
  marginLeft: number
  borderWidth: number
  borderStyle: string
  borderColor: string
  borderRadius: number
  backgroundColor: string
  display: string
  position: string
}

export function BoxLayout() {
  const [showCode, setShowCode] = useState(false)
  const [copiedCSS, setCopiedCSS] = useState(false)
  const [copiedTailwind, setCopiedTailwind] = useState(false)
  const [copiedModalCSS, setCopiedModalCSS] = useState(false)
  const [copiedModalTailwind, setCopiedModalTailwind] = useState(false)

  const [boxConfig, setBoxConfig] = useState<BoxConfig>({
    width: 300,
    height: 200,
    paddingTop: 20,
    paddingRight: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: '#3B82F6',
    borderRadius: 8,
    backgroundColor: '#1F2937',
    display: 'block',
    position: 'static'
  })

  const updateBoxConfig = (key: keyof BoxConfig, value: string | number) => {
    setBoxConfig(prev => ({ ...prev, [key]: value }))
  }

  const resetBoxConfig = () => {
    setBoxConfig({
      width: 300,
      height: 200,
      paddingTop: 20,
      paddingRight: 20,
      paddingBottom: 20,
      paddingLeft: 20,
      marginTop: 0,
      marginRight: 0,
      marginBottom: 0,
      marginLeft: 0,
      borderWidth: 2,
      borderStyle: 'solid',
      borderColor: '#3B82F6',
      borderRadius: 8,
      backgroundColor: '#1F2937',
      display: 'block',
      position: 'static'
    })
  }

  const getBoxStyle = (): CSSProperties => {
    return {
      width: `${boxConfig.width}px`,
      height: `${boxConfig.height}px`,
      paddingTop: `${boxConfig.paddingTop}px`,
      paddingRight: `${boxConfig.paddingRight}px`,
      paddingBottom: `${boxConfig.paddingBottom}px`,
      paddingLeft: `${boxConfig.paddingLeft}px`,
      marginTop: `${boxConfig.marginTop}px`,
      marginRight: `${boxConfig.marginRight}px`,
      marginBottom: `${boxConfig.marginBottom}px`,
      marginLeft: `${boxConfig.marginLeft}px`,
      borderWidth: `${boxConfig.borderWidth}px`,
      borderStyle: boxConfig.borderStyle as CSSProperties['borderStyle'],
      borderColor: boxConfig.borderColor,
      borderRadius: `${boxConfig.borderRadius}px`,
      backgroundColor: boxConfig.backgroundColor,
      display: boxConfig.display as CSSProperties['display'],
      position: boxConfig.position as CSSProperties['position']
    }
  }

  const getCSSCode = () => {
    return `width: ${boxConfig.width}px;
height: ${boxConfig.height}px;
padding: ${boxConfig.paddingTop}px ${boxConfig.paddingRight}px ${boxConfig.paddingBottom}px ${boxConfig.paddingLeft}px;
margin: ${boxConfig.marginTop}px ${boxConfig.marginRight}px ${boxConfig.marginBottom}px ${boxConfig.marginLeft}px;
border: ${boxConfig.borderWidth}px ${boxConfig.borderStyle} ${boxConfig.borderColor};
border-radius: ${boxConfig.borderRadius}px;
background-color: ${boxConfig.backgroundColor};
display: ${boxConfig.display};
position: ${boxConfig.position};`
  }

  const getTailwindCode = () => {
    // 간단한 Tailwind 변환 (완벽하지 않지만 기본적인 것들)
    return `className="..." style={{
  width: '${boxConfig.width}px',
  height: '${boxConfig.height}px',
  padding: '${boxConfig.paddingTop}px ${boxConfig.paddingRight}px ${boxConfig.paddingBottom}px ${boxConfig.paddingLeft}px',
  margin: '${boxConfig.marginTop}px ${boxConfig.marginRight}px ${boxConfig.marginBottom}px ${boxConfig.marginLeft}px',
  border: '${boxConfig.borderWidth}px ${boxConfig.borderStyle} ${boxConfig.borderColor}',
  borderRadius: '${boxConfig.borderRadius}px',
  backgroundColor: '${boxConfig.backgroundColor}',
  display: '${boxConfig.display}',
  position: '${boxConfig.position}'
}}`
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

  const PropertyPanel = ({
    title,
    properties
  }: {
    title: string
    properties: Array<{
      label: string
      key: keyof BoxConfig
      type: 'number' | 'text' | 'color' | 'select'
      options?: string[]
    }>
  }) => {
    return (
      <div className="bg-gray-800 rounded-lg p-4">
        <h3 className="text-gray-300 text-sm font-semibold mb-3">{title}</h3>
        <div className="grid grid-cols-2 gap-3">
          {properties.map((prop) => (
            <div key={prop.key}>
              <label className="block text-xs text-gray-400 mb-1">{prop.label}</label>
              {prop.type === 'number' && (
                <input
                  type="number"
                  value={boxConfig[prop.key] as number}
                  onChange={(e) => updateBoxConfig(prop.key, parseInt(e.target.value) || 0)}
                  className="w-full bg-gray-700 text-gray-200 rounded px-2 py-1 text-sm"
                />
              )}
              {prop.type === 'text' && (
                <input
                  type="text"
                  value={boxConfig[prop.key] as string}
                  onChange={(e) => updateBoxConfig(prop.key, e.target.value)}
                  className="w-full bg-gray-700 text-gray-200 rounded px-2 py-1 text-sm"
                />
              )}
              {prop.type === 'color' && (
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={boxConfig[prop.key] as string}
                    onChange={(e) => updateBoxConfig(prop.key, e.target.value)}
                    className="w-8 h-8 rounded cursor-pointer flex-shrink-0"
                  />
                  <input
                    type="text"
                    value={boxConfig[prop.key] as string}
                    onChange={(e) => updateBoxConfig(prop.key, e.target.value)}
                    className="flex-1 bg-gray-700 text-gray-200 rounded px-2 py-1 text-sm min-w-0"
                  />
                </div>
              )}
              {prop.type === 'select' && (
                <select
                  value={boxConfig[prop.key] as string}
                  onChange={(e) => updateBoxConfig(prop.key, e.target.value)}
                  className="w-full bg-gray-700 text-gray-200 rounded px-2 py-1 text-sm"
                >
                  {prop.options?.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <section className="relative w-[calc(100%-16rem)] min-h-screen bg-gray-900 py-20 pt-8 ml-64">
      <div className="max-w-7xl mx-auto px-5">
        <h2 className="text-4xl font-bold text-center mb-6 text-white">
          Box Layout
        </h2>

        {/* 설명 섹션 - 항상 표시 */}
        <div className="max-w-7xl mx-auto mb-12">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-white text-lg font-semibold mb-4">박스 레이아웃 속성 설정</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300 text-sm">
              <div className="bg-gray-700/50 rounded p-4">
                <h4 className="text-indigo-400 font-semibold mb-2">크기 및 간격</h4>
                <p className="text-xs leading-relaxed">
                  <span className="text-yellow-400">Width, Height</span>로 박스 크기를 조절하고,
                  <span className="text-yellow-400">Padding, Margin</span>으로 내부/외부 간격을 설정합니다.
                </p>
              </div>
              
              <div className="bg-gray-700/50 rounded p-4">
                <h4 className="text-indigo-400 font-semibold mb-2">테두리 및 배경</h4>
                <p className="text-xs leading-relaxed">
                  <span className="text-yellow-400">Border</span>로 테두리 스타일을 지정하고,
                  <span className="text-yellow-400">Background</span>로 배경색을 설정합니다.
                </p>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-700">
              <p className="text-xs text-gray-400">
                <strong className="text-white">핵심 원리:</strong> 박스 모델의 각 속성을 개별적으로 조정하여 원하는 레이아웃을 구현할 수 있습니다. 실시간으로 변경사항을 확인하며 최적의 값을 찾아보세요.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 왼쪽: 설정 패널 */}
          <div className="space-y-6">
            {/* 크기 섹션 */}
            <PropertyPanel
              title="크기 (Size)"
              properties={[
                { label: 'Width (px)', key: 'width', type: 'number' },
                { label: 'Height (px)', key: 'height', type: 'number' }
              ]}
            />

            {/* Padding 섹션 */}
            <PropertyPanel
              title="Padding (내부 간격)"
              properties={[
                { label: 'Top (px)', key: 'paddingTop', type: 'number' },
                { label: 'Right (px)', key: 'paddingRight', type: 'number' },
                { label: 'Bottom (px)', key: 'paddingBottom', type: 'number' },
                { label: 'Left (px)', key: 'paddingLeft', type: 'number' }
              ]}
            />

            {/* Margin 섹션 */}
            <PropertyPanel
              title="Margin (외부 간격)"
              properties={[
                { label: 'Top (px)', key: 'marginTop', type: 'number' },
                { label: 'Right (px)', key: 'marginRight', type: 'number' },
                { label: 'Bottom (px)', key: 'marginBottom', type: 'number' },
                { label: 'Left (px)', key: 'marginLeft', type: 'number' }
              ]}
            />

            {/* Border 섹션 */}
            <PropertyPanel
              title="Border (테두리)"
              properties={[
                { label: 'Width (px)', key: 'borderWidth', type: 'number' },
                { label: 'Style', key: 'borderStyle', type: 'select', options: ['solid', 'dashed', 'dotted', 'double', 'none'] },
                { label: 'Color', key: 'borderColor', type: 'color' },
                { label: 'Radius (px)', key: 'borderRadius', type: 'number' }
              ]}
            />

            {/* 기타 속성 */}
            <PropertyPanel
              title="기타 속성"
              properties={[
                { label: 'Background Color', key: 'backgroundColor', type: 'color' },
                { label: 'Display', key: 'display', type: 'select', options: ['block', 'inline', 'inline-block', 'flex', 'grid', 'none'] },
                { label: 'Position', key: 'position', type: 'select', options: ['static', 'relative', 'absolute', 'fixed', 'sticky'] }
              ]}
            />

            {/* 리셋 버튼 */}
            <button
              onClick={resetBoxConfig}
              className="w-full px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors"
            >
              초기화
            </button>
          </div>

          {/* 오른쪽: 미리보기 */}
          <div className="w-full">
            <div className="w-full">
              <div className="bg-gray-800 rounded-lg p-6 mb-4">
                <h4 className="text-white text-lg font-semibold mb-2">실시간 미리보기</h4>
                <p className="text-gray-400 text-sm">설정한 값이 실시간으로 반영됩니다</p>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-8 w-full min-h-[400px] flex items-center justify-center">
                <div
                  className="transition-all"
                  style={getBoxStyle()}
                >
                  <div className="text-center text-white">
                    <p className="text-lg font-semibold mb-2">Box Preview</p>
                    <p className="text-sm text-gray-300">레이아웃 효과를 확인하세요</p>
                  </div>
                </div>
              </div>

              {/* 프리셋 설정 */}
              <div className="mt-4 bg-gray-800 rounded-lg p-6 min-h-[200px] flex flex-col">
                <h4 className="text-white text-lg font-semibold mb-4">프리셋 설정</h4>
                <p className="text-gray-400 text-sm mb-6">원하는 레이아웃을 선택하면 예시 값이 자동으로 입력됩니다</p>
                <div className="flex flex-col gap-4 flex-1">
                  <button
                    onClick={() => {
                      setBoxConfig({
                        ...boxConfig,
                        width: 400,
                        height: 300,
                        paddingTop: 40,
                        paddingRight: 40,
                        paddingBottom: 40,
                        paddingLeft: 40,
                        borderRadius: 16,
                        borderWidth: 0,
                        backgroundColor: '#3B82F6'
                      })
                    }}
                    className="w-full px-6 py-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-xl text-left flex-1 flex flex-col justify-center"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-lg mb-1">카드 레이아웃</p>
                        <p className="text-sm text-indigo-200">넓은 패딩과 둥근 모서리</p>
                      </div>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      setBoxConfig({
                        ...boxConfig,
                        width: 300,
                        height: 200,
                        paddingTop: 20,
                        paddingRight: 20,
                        paddingBottom: 20,
                        paddingLeft: 20,
                        borderRadius: 0,
                        borderWidth: 2,
                        borderStyle: 'solid',
                        borderColor: '#10B981',
                        backgroundColor: '#1F2937'
                      })
                    }}
                    className="w-full px-6 py-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-xl text-left flex-1 flex flex-col justify-center"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-lg mb-1">테두리 박스</p>
                        <p className="text-sm text-indigo-200">명확한 테두리와 기본 패딩</p>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white text-sm font-semibold">CSS 코드</h4>
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
                <h4 className="text-white text-sm font-semibold">Tailwind CSS (인라인 스타일)</h4>
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
                    <h4 className="text-white font-semibold">CSS 코드</h4>
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
                    <h4 className="text-white font-semibold">Tailwind CSS (인라인 스타일)</h4>
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

