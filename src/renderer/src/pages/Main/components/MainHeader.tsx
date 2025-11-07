import { useState } from 'react';
import Logo from '../../../assets/logo.svg?react';
import { cn } from '../../../utils/cn';

type TabType = 'dashboard' | 'plan' | 'settings';

const DashboardIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 3H9V9H3V3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M11 3H17V9H11V3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 11H9V17H3V11Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M11 11H17V17H11V11Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const PlanIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 4H16V16H4V4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 8H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 4V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const SettingsIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 12C11.1046 12 12 11.1046 12 10C12 8.89543 11.1046 8 10 8C8.89543 8 8 8.89543 8 10C8 11.1046 8.89543 12 10 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15.6569 12.3431L14.9497 13.0503C14.6584 13.3416 14.3416 13.6584 14.0503 13.9497L13.3431 14.6569C12.2663 15.7337 10.7337 15.7337 9.65685 14.6569L5.34315 10.3431C4.26634 9.26634 4.26634 7.73366 5.34315 6.65685L6.05025 5.94975C6.34154 5.65846 6.65846 5.34154 6.94975 5.05025L7.65685 4.34315C8.73366 3.26634 10.2663 3.26634 11.3431 4.34315L15.6569 8.65685C16.7337 9.73366 16.7337 11.2663 15.6569 12.3431Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const MainHeader = () => {
    const [activeTab, setActiveTab] = useState<TabType>('dashboard');

    const tabs = [
        { id: 'dashboard' as TabType, label: '대시보드', icon: DashboardIcon },
        { id: 'plan' as TabType, label: '계획', icon: PlanIcon },
        { id: 'settings' as TabType, label: '설정', icon: SettingsIcon },
    ];

    return (
        <div className="mb-6">
            {/* 타이틀 영역 */}
            <div className="mb-4 flex items-center gap-2">
                <span className="aspect-[37/32] w-[37px] bg-[rgba(255,191,0,0.10)]" />
                <Logo className="h-[22px] w-[92px] [&>path]:fill-logo-fill" />
            </div>

            {/* 네비게이션 탭 */}
            <nav className="flex gap-2">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;

                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={cn(
                                'flex items-center gap-2 rounded-lg px-4 py-2 transition-colors',
                                isActive
                                    ? 'bg-yellow-400 text-grey-900'
                                    : 'bg-grey-25 text-grey-500 hover:text-grey-700'
                            )}
                        >
                            <Icon />
                            <span className="text-body-md-medium">{tab.label}</span>
                        </button>
                    );
                })}
            </nav>
        </div>
    );
};

export default MainHeader;

