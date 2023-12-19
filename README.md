zod dto总是可选的解决办法，设置tsconfig内的strictNullChecks为true

https://stackoverflow.com/questions/71185664/why-does-zod-make-all-my-schema-fields-optional

tsconfig，strictNullChecks默认为false，但是如果开启strict，则默认为true
"strictNullChecks": true,
"strict": true



https://github.com/risen228/nestjs-zod/issues/23


https://github.com/drizzle-team/drizzle-orm/pull/1509