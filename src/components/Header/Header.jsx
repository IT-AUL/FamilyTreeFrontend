import * as React from "react";
import {
    AppNavBar,
    setItemActive
} from "baseui/app-nav-bar";
import {
    ChevronDown,

    Overflow,
    Upload
} from "baseui/icon";

const Header = () => {
    const [mainItems, setMainItems] = React.useState([
        {
            icon: Upload,
            label: "Главная"
        },
        {

            icon: ChevronDown,
            label: "О нас",

        },
        {
            active: true,
            icon: ChevronDown,
            label: "Древо",

        }
    ]);
    return (
        <AppNavBar
            title="Flipa"
            mainItems={mainItems}
            onMainItemSelect={item => {
                setMainItems(prev => setItemActive(prev, item));
            }}
            username="Ренат Губайдуллин"
            usernameSubtitle="renat2006"
            userItems={[
                {
                    icon: Overflow,
                    label: "Профиль"
                },
                {
                    icon: Overflow,
                    label: "Выйти"
                }
            ]}
            onUserItemSelect={item => console.log(item)}
        />
    );
}
export default Header