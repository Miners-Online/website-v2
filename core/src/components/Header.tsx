'use client';

import {Avatar, Header} from '@primer/react'

export default function HeaderComponent() {
    return (
        <>
        <Header>
            <Header.Item>
                <Header.Link
                    href="#"
                    sx={{
                    fontSize: 2,
                    }}
                >
                    {/* <Octicon
                    icon={MarkGithubIcon}
                    size={32}
                    sx={{
                        mr: 2,
                    }}
                    /> */}
                    <span>Miners Online</span>
                </Header.Link>
            </Header.Item>
            <Header.Item full>Menu</Header.Item>
            <Header.Item
                sx={{
                    mr: 0,
                }}
                >
                <Avatar
                    src="https://github.com/octocat.png"
                    size={20}
                    square
                    alt="@octocat"
                />
            </Header.Item>
        </Header>
        </>
    );
}