import styled from "styled-components";

export const Container = styled.div`
    overflow-x: hidden;

    h3 {
        margin-left: var(--max-container-margin);
        margin-top: 1rem;
        margin-bottom: 1rem;
        font-weight: 500;
        font-size: 2.6rem;
        line-height: 3.32rem;
        color: var(--color-smoke-white);
    }

    .swiper-wrapper {
        gap: 0.5rem;

        &:active {
            cursor: grabbing;
        }
    }

    .swiper-slide {
        width: fit-content !important;
    }
`;
