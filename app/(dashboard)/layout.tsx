import { Header } from "@/components/ui/Header";
import { NewAccountSheet } from "@/features/accounts/components/new-account-sheet";

type Props = {
    children: React.ReactNode;
};

const DashboardLayout = ({ children }: Props) => {
    return (
        <>
        <Header />
        <NewAccountSheet />
        <main>
            {children}
        </main>
        </>
    );
}

export default DashboardLayout;