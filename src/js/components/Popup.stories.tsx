import type { Meta } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { sleep } from "../storybook";
import { Button } from "../utilities";
import Popup from "./Popup";
import PopupActions from "./PopupActions";
import PopupContent from "./PopupContent";

const meta = {
    component: Popup
} satisfies Meta<typeof Popup>;

export default meta;

export const Default = () => (
    <Popup onBackgroundClick={fn()}>
        <PopupContent className="w-sm" title="Account löschen">
            <p className="body-m">
                Bist du sicher, dass du den Account dieses Nutzers löschen möchtest?
            </p>
        </PopupContent>
        <PopupActions>
            <Button variant="secondary" onClick={fn()}>Abbrechen</Button>
            <Button variant="danger" onClick={fn(() => sleep(2000))}>Account löschen</Button>
        </PopupActions>
    </Popup>
)