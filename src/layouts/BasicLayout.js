import Header from "../components/ui/Header";
import Footer from "../components/ui/Footer";

const BasicLayout = ({children}) => {
    return (
        <> 
        {/* 헤더 */}
        <Header />
        {/* Main 페이지 */}
        <main className="flex flex-col items-center h-full min-h-dvh py-2 px-5 mb-10">{children}</main>
         {/* Footer */}
         <Footer />
        </>
    );
}

export default BasicLayout;
