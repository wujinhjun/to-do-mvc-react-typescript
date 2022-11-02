# A to do app by react and typescript

***

## why

This is the address of origin project: [todoMVC-react](https://todomvc.com/examples/react/#/)

***

This is the homework when I first came into contact with react.
But at that time, I was quarantined since the COVID-19 and was in a bad mood and didn't want to study the new knowledge.
Therefore, the homework maybe could be called shit. Of course, I don't know how to use typescript at that time. So today I want to finish the homework to make up for the original pity.

## online address

This is the github pages: [To-do-mvc](https://wujinhjun.github.io/to-do-mvc-react-typescript/)

## how to use the docker

When you git clone this repository, you can use docker to deploy in your computer, even if your node edition is different from mine.

``` bash

git clone git@github.com:wujinhjun/to-do-mvc-react-typescript.git your-project-name

cd your-project-name

docker image build -t to-do-mvc-demo .

docker run -dp 3000:3000 to-do-mvc-demo
```

Then, you can open the [localhost:3000](http://localhost:3000) in your browser to use this project.

***

After I finished this MVC, I have a lot of feelings. It's probably been three months since I started Front-end, and I can finally make something interesting with typescript. It is memorable.
