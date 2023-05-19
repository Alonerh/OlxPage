import styled from "styled-components";

export const HeaderArea = styled.div`
    background-color: #fff;
    border-bottom: 1px solid #ccc;

    .container {
        max-width: 1000px;
        margin: auto;
        display: flex;
    }

    a {
        text-decoration: none;
    }

    .logo {
        height: 60px;
        flex: 1;
        display: flex;
        align-items: center;

        .logo1,
        .logo2, 
        .logo3 {
            font-size: 27px;
            font-weight: bold;
        }
        .logo1 {
            color: #f00;
        }
        .logo2 {
            color: #0f0;
        }
        .logo3 {
            color: #00f;
        }
    }
    nav {
        padding-top: 10px;
        padding-bottom: 10px;

        ul, li {
            margin: 0;
            padding: 0;
            list-style: none;
        }

        ul {
            height: 40px;
            display: flex;
            align-items: center;
        }
        li {
            margin: 0px 20px;

            a, button {
                border: 0;
                background: none;
                cursor: pointer;
                color: #000;
                font-size: 14px;
                text-decoration: none;

                &:hover {
                    color: #999;
                }

                &.button {
                    background-color: #ff8100;
                    border-radius: 4px;
                    color: #fff;
                    padding: 5px 10px;

                    &:hover {
                        background-color: #e57706;
                    }
                }
                
            }
        }
    }
`;
