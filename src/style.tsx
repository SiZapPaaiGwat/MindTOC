import React from 'react'

export function Style() {
  return (
    <style>
      {`
@media (prefers-color-scheme: dark) {
  .content_wrapper {
    --tw-bg-opacity: 1;
    background-color: rgb(15 23 42 / var(--tw-bg-opacity));
  }
}
@media (prefers-color-scheme: dark) {
  .content_title {
    --tw-text-opacity: 1;
    color: rgb(226 232 240 / var(--tw-text-opacity));
  }
}
@media (prefers-color-scheme: dark) {
  .content_list_item {
    --tw-bg-opacity: 1;
    background-color: rgb(15 23 42 / var(--tw-bg-opacity));
  }
}
@media (prefers-color-scheme: dark) {
  .content_list_item[data-selected='true'] {
    --tw-border-opacity: 1;
    border-color: rgb(226 232 240 / var(--tw-border-opacity));
  }
}
@media (prefers-color-scheme: dark) {
  .content_list_item a {
    --tw-text-opacity: 1;
    color: rgb(226 232 240 / var(--tw-text-opacity));
  }
  .content_list_item a:hover {
    --tw-text-opacity: 1;
    color: rgb(248 250 252 / var(--tw-text-opacity));
  }
}
@media (prefers-color-scheme: dark) {
  .content_list_item[data-selected='true'] a {
    --tw-text-opacity: 1;
    color: rgb(248 250 252 / var(--tw-text-opacity));
  }
}
    `}
    </style>
  )
}
