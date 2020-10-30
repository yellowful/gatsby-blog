const size={
    medium:'30em',
    large:'60em'
}

export const breakpoints = {
    ns:`screen and (min-width: ${size.medium})`,
    m:`screen and (min-width: ${size.medium}) and (max-width: ${size.large})`,
    l:`screen and (min-width: ${size.large})`
}