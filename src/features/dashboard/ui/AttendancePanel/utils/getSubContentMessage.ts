export const getSubContentMessage = (subContent?: string): string => {
  if (!subContent) {
    return '당신은 매일 골든리트리버 한 마리를 목에 업고 작업한 것과 같아요 🥺';
  }

  const messageMap: Record<string, string> = {
    뽀각거부기: '뚠뚠한 골든리트리버 한 마리를 매일 목에 업고 있어요 🐶',
    꾸부정거부기: '기내용 캐리어를 목 위에 올려두고 앉아 있는 셈이에요 🧳',
    아기기린: '무거운 볼링공을 목에 걸고 일하는 중이에요 🎳',
    쑥쑥기린: '작은 수박 한 통 정도를 목에 얹은 상태예요 🍉',
    꽃꼿기린: '머리 본연의 무게만 딱! 지금 아주 좋아요 🌸',
  };

  return messageMap[subContent] || subContent;
};
