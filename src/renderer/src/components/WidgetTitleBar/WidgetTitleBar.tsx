interface WidgetTitleBarProps {
  onClose?: () => void;
  isMini?: boolean; // 미니 모드 여부
}

/* 커스텀 위젯 타이틀바 (frame: false 일 때 사용) */
export function WidgetTitleBar({
  onClose,
  isMini = true,
}: WidgetTitleBarProps) {
  // 위젯 닫기
  const handleClose = async () => {
    try {
      if (window.electronAPI?.widget) {
        await window.electronAPI.widget.close();
      }
      onClose?.();
    } catch (error) {
      console.error('위젯 닫기 실패:', error);
    }
  };

  return (
    <div
      className={
        isMini
          ? 'bg-grey-0 mr-1 flex h-full w-2 flex-col'
          : 'bg-grey-0 mb-1 flex h-2 w-full'
      }
      style={{
        // 드래그 가능하게 설정 (Electron에서 창 이동 가능)
        // @ts-expect-error: electronAPI 타입 정의 없음
        WebkitAppRegion: 'drag',
      }}
    >
      {/* 빨간 닫기 버튼 */}
      <button
        onClick={handleClose}
        className="h-2 w-2 rounded-full bg-[#FF5154] hover:bg-red-600"
        style={{
          // 버튼은 클릭 가능하도록 드래그 비활성화
          // @ts-expect-error: electronAPI 타입 정의 없음
          WebkitAppRegion: 'no-drag',
        }}
        aria-label="닫기"
      />

      {/* 드래그 영역 (사용자가 창 크기를 조절할 수 있음) */}
    </div>
  );
}
