
interface HeaderProps {
    header: string;
  }
  

const Header = (props: HeaderProps) => {
    return (
        <header>
        <h1>{props.header}</h1>
        </header>
    );
    };

export default Header;