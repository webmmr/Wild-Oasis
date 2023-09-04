import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";
// import Uploader from "../data/Uploader";

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 0rem;
  border-right: 1px solid var(--color-grey-100);

  grid-row: 1 / -1;

  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  justify-content: space-between;
`;

function Sidebar() {
  return (
    <StyledSidebar>
      <div>
        <Logo />
        <MainNav />
      </div>
      {/* to upload demo data */}
      {/* <Uploader /> */}
      <div style={{ textAlign: "center" }}>
        {new Date().toLocaleDateString("en-us", {
          weekday: "long",
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </div>
    </StyledSidebar>
  );
}

export default Sidebar;
