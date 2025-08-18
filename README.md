# Run project report `sudo npm run bundle-report`  

kafka_2.13-3.9.0/bin/zookeeper-server-start.sh kafka_2.13-3.9.0/config/zookeeper.properties
kafka_2.13-3.9.0/bin/kafka-server-start.sh kafka_2.13-3.9.0/config/server.properties


# 💫 About Me:

Angular, typescript, cypress, ngrx, rxjs, signals, react, node, mongodb, mongoose


# 💻 Tech Stack:
![Angular](https://img.shields.io/badge/angular-%23DD0031.svg
?style=for-the-badge&logo=angular&logoColor=white) ![Nodemon](https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD) ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white) ![RxJS](https://img.shields.io/badge/rxjs-%23B7178C.svg?style=for-the-badge&logo=reactivex&logoColor=white) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Vue.js](https://img.shields.io/badge/vue.js-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D) ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white) ![React Native](https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
# 📊 GitHub Stats:
![](https://github-readme-stats.vercel.app/api?username=bhargavr445&theme=dark&hide_border=false&include_all_commits=false&count_private=false)<br/>
![](https://github-readme-streak-stats.herokuapp.com/?user=bhargavr445&theme=dark&hide_border=false)<br/>
![](https://github-readme-stats.vercel.app/api/top-langs/?username=bhargavr445&theme=dark&hide_border=false&include_all_commits=false&count_private=false&layout=compact)

---
[![](https://visitcount.itsvg.in/api?id=bhargavr445&icon=0&color=0)](https://visitcount.itsvg.in)

<!-- Proudly created with GPRM ( https://gprm.itsvg.in ) -->

![Angular]()
# Multiple Router outlets
yes we can acheive this by using named router-outlet, and in router congig we need to pass `outlet` prop
Ex: 
<router-outlet name="left"></outlet>
<router-outlet name="right"></outlet>
{path: '', component: '', outlet: left}
{path: '', component: '', outlet: right}
![ref](https://www.youtube.com/watch?v=IXy9UmKfSeM)


# services 

@Injectable root - `Will download and create reference 1st time when component is used`

providers [] in [App_Config] - `services which are registered here will be loaded at app initial loading time, [which means] these services are ignored by Angular tree shaking and included in the initial bundle`

provider [] in [Component] - `will create multiple instance and references if we use this component based approach` ![i.e](`if we use this component selector multiple times, this service instance is create multiple time along with reference`)


[Injecting_Service_into_another_Service] - `these 2 services can be registered as 1 or 2 approachees [MIX_AND_MATCH]`

Note: student servie is created as approach 1
Now if i create Logger service and if i use 3rd approach to register Logger service in component and if i inject logger into student service then it will give null injector error


# new Control flow
# @let

[VAR]
# signals
# computed Signals
# effects
# signal inputs/outputs 
# Modal inputs/outputs
# signals instead of Behaviour Subjects
# zone less apps

# toSignal
# toObservable


[ROUTING]
# Router Outlet input
# load component
# deferable views
# functional guards
# accessing data vie inputs(`@Input() or input()`)
# Router outlet data - v-19(can access data only in direct child components)


[SSR
# SSR with problems and solutions
# Hydration

# O(1) - [constant-time] - `no matter how data gets increased but the operation time is same always`
ex: take  1st element from the list. 

# O(n) - [linear-time] - `the amount of data increases time will also grows up to perform that operation`
ex: finding an element from array.





