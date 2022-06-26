import {MouseEvent}  from "react";

export function mouseMoveHandler(event: MouseEvent<HTMLDivElement>) {
  const yeys: HTMLElement = document.querySelector('.pet__eyes')
  const x = event.clientX;
  const y = event.clientY;

  const centerX = event.currentTarget.offsetWidth / 2;
  const ecvatorXLeft = centerX + 130;
  const ecvatorXRight = centerX + 330;

  const centerY = event.currentTarget.offsetHeight * 3 / 4;
  const ecvatorYUp = centerY + 90;
  const ecvatorYDown = centerY + 290;

  // left-up-right

  if (x < ecvatorXLeft && y < ecvatorYUp) yeys.style.transform = 'translate(-3px, -3px)';
  if (x > ecvatorXLeft && x < ecvatorXRight && y < ecvatorYUp) yeys.style.transform = 'translate(0, -3px)';
  if (x > ecvatorXRight && y < ecvatorYUp) yeys.style.transform = 'translate(3px, -3px)';

  // left-down-right

  if (x < ecvatorXLeft && y > ecvatorYDown) yeys.style.transform = 'translate(-3px, 3px)';
  if (x > ecvatorXLeft && x < ecvatorXRight && y > ecvatorYDown) yeys.style.transform = 'translate(0, 3px)';
  if (x > ecvatorXRight && y > ecvatorYDown) yeys.style.transform = 'translate(3px, 3px)';

  // left

  if (x < ecvatorXLeft && y > ecvatorYUp && y < ecvatorYDown) yeys.style.transform = 'translate(-3px, 0)';

  // right

  if (x > ecvatorXLeft && y > ecvatorYUp && y < ecvatorYDown) yeys.style.transform = 'translate(3px, 0)';

  // center

  if (x > ecvatorXLeft && x < ecvatorXRight && y > ecvatorYUp && y < ecvatorYDown) yeys.style.transform = 'translate(0, 0)';
}
