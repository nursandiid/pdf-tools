import AppLayout from "@/layouts/AppLayout";
import Wrapper from "@/components/Wrapper";
import Hero from "@/components/welcome/Hero";
import Services from "@/components/welcome/Services";

export default function Welcome() {
  return (
    <AppLayout title="Online PDF tools" footer={true}>
      <Wrapper>
        <Hero />
        <Services />
      </Wrapper>
    </AppLayout>
  );
}
