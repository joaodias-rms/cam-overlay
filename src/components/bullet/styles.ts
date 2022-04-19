import styled from 'styled-components';
import { design } from '../../global/theme/color.config';

interface Props {
    active?: boolean;
}

export const Container = styled.view<Props>`
    width: 8px;
    height: 8px;

    background-color: ${({ active }) =>
        active ? design.button_text : design.button_text};

    margin-left: 8px;
    border-radius: 3px;
`;
