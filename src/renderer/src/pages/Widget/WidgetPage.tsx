/* 위젯 창에 표시될 페이지 - 반응형 */

import { useState, useEffect } from 'react';
import { WidgetTitleBar } from '../../components/WidgetTitleBar/WidgetTitleBar';

type WidgetSize = 'mini' | 'medium';

/* 레이아웃 전환 기준점 (widgetConfig.ts와 동일) */
const BREAKPOINT = {
  width: 192,
  height: 268,
} as const;

export function WidgetPage() {
  const [widgetSize, setWidgetSize] = useState<WidgetSize>('mini');

  useEffect(() => {
    /* resize 디바운스 타이머 ID 저장용 변수 */
    let resizeTimeout: number;

    /* 창 크기 변경 감지 핸들러 */
    const handleResize = () => {
      const isMedium =
        innerWidth > BREAKPOINT.width && innerHeight > BREAKPOINT.height;
      /* breakpoint를 넘으면 medium, 아니면 mini */
      setWidgetSize(isMedium ? 'medium' : 'mini');
    };

    /* 디바운스 래퍼 함수 */
    const handleResizeDebounced = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(() => {
        handleResize();
      }, 10);
    };

    handleResize();
    window.addEventListener('resize', handleResizeDebounced);

    return () => {
      window.removeEventListener('resize', handleResizeDebounced);
      clearTimeout(resizeTimeout);
    };
  }, []);

  const isMini = widgetSize === 'mini';

  return (
    <div className="bg-grey-0 h-screen w-screen overflow-hidden px-1 py-[5px]">
      <div className={isMini ? 'flex h-full w-full' : 'h-full w-full'}>
        {/* 커스텀 타이틀바 */}
        <WidgetTitleBar isMini={isMini} />

        {/* 위젯 내용 - 창 크기에 따라 자동 전환 */}
        {isMini ? <MiniWidgetContent /> : <MediumWidgetContent />}
      </div>
    </div>
  );
}

/* 미니 위젯 레이아웃 - 최대 50px 높이에 맞게 가로 배치 */
function MiniWidgetContent() {
  return (
    <div className="flex h-full items-center gap-2 bg-gradient-to-br from-green-400 to-green-500 px-3">
      {/* 캐릭터 이미지 영역 - 작게 */}
      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-yellow-400">
        <div className="text-xl">🦒</div>
      </div>

      {/* 간단한 상태 표시 - 가로로 컴팩트하게 */}
      <div className="flex items-center gap-2 rounded-lg bg-white/90 px-2 py-1">
        <div className="text-xs text-gray-600">자세 점수</div>
        <div className="text-lg font-bold text-green-600">85</div>
      </div>
    </div>
  );
}

/* 미디엄 위젯 레이아웃 */
function MediumWidgetContent() {
  return (
    <div className="flex h-full w-full flex-col">
      {/* 캐릭터 영역 */}
      <div className="mb-[2px] flex aspect-[1/1] w-full max-w-[256px] min-w-[185px] flex-1 items-center justify-center rounded-lg bg-linear-[180deg,var(--color-olive-green)_0.18%,var(--color-success)_99.7%]">
        {' '}
      </div>

      {/* 상세 정보 영역 */}
      <div className="bg-grey-0 flex w-full flex-1 flex-col justify-center px-2">
        {/* 진행 바 */}
        <div className="h-fit w-full rounded-lg">
          <div className="bg-grey-50 h-3 w-full rounded-full">
            <div
              className="h-full rounded-lg bg-green-500 bg-linear-[180deg,var(--color-olive-green)_0.18%,var(--color-success)_99.7%] transition-all"
              style={{ width: '50%' }}
            />
          </div>
        </div>

        {/* 메시지 */}
        <div className="bg-grey-0 mt-2">
          <div className="text-body-md-semibold text-grey-700">
            좋아요, 기린 상태 유지중!
          </div>
          <div className="text-caption-xs-meidum text-grey-400">
            집중력 최고 상태에요
          </div>
        </div>
      </div>
    </div>
  );
}
