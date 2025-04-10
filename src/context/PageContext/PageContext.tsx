import { createContext, useContext, useState, type ReactNode } from 'react';

type CustomStates = Record<string, any>;

interface PageContextType {
  pageIndex: number;
  setPageIndex: (index: number) => void;
  pageTitle: string;
  setPageTitle: (title: string) => void;
  customStates: CustomStates;
  setCustomStates: (states: CustomStates) => void;
};

const PageContext = createContext<PageContextType | undefined>(undefined);

export const PageProvider = ({ children }: { children: ReactNode }) => {
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [pageTitle, setPageTitle] = useState<string>('home');
  const [customStates, setCustomStates] = useState<CustomStates>({});

  return (
    <PageContext.Provider
      value={{ pageIndex, setPageIndex, pageTitle, setPageTitle, customStates, setCustomStates }}
    >
      {children}
    </PageContext.Provider>
  );
};

export const usePageContext = (): PageContextType => {
  const context = useContext(PageContext);
  if (!context) throw new Error('usePageContext must be used within a PageProvider');
  return context;
};
