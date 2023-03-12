export function showCard(card: string, overlay: string)  {
    const overEle = document.getElementById(`${overlay}`)
    const actioncard = document.getElementById(`${card}`)
    overEle?.classList.toggle('opened')
    actioncard?.classList.toggle('slide-in')
    actioncard?.classList.remove('slide-out')
}
export function closeCard (card: string, overlay: string) {
    const overEle = document.getElementById(`${overlay}`)
    const actioncard = document.getElementById(`${card}`)
    overEle?.classList.toggle('opened')
    actioncard?.classList.remove('slide-in')
    actioncard?.classList.toggle('slide-out')
}