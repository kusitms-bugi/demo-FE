import InfoPanel from './components/InfoPanel';

const OnboardinInitPage = () => {
  return (
    <main className="hbp:pt-[75px] hbp:h-[calc(100vh-75px)] flex h-[calc(100vh-60px)] flex-col items-center">
      <div className="hbp:mx-auto hbp:max-w-screen-lg hbp:px-10 relative h-full w-full overflow-visible">
        <section className="hbp:gap-15 hbp:px-20 flex h-full w-full items-center">
          <div className="h-full flex-1"></div>
          <InfoPanel />
        </section>
      </div>
    </main>
  );
};

export default OnboardinInitPage;
