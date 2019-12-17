import {useRef, useEffect} from 'react';

class Animator
{
    constructor(node = null)
    {
        this.animations = [];
        this.node = node;
    }

    add(animation)
    {
        const index = this.find(animation);

        if(index === -1)
        {
            this.animations.push(animation);
            this.node.addEventListener('animationstart', (e) => {
                if(e.animationName === animation.name)
                {
                    animation.over = false;
                }
            });
            this.node.addEventListener('animationend', (e) => {
                if(e.animationName === animation.name)
                {
                    animation.over = true;
                }
            });
        }
        else
        {
            this.animations[index] = animation;
        }
    }

    remove(animation)
    {
        const index = this.find(animation);

        if(index === -1)
        {
            return;
        }

        this.animations.splice(index, 1);
    }

    isOver(animation)
    {
        let index = this.find(animation);

        if(index === -1)
        {
            return;
        }

        return this.animations[index].over === true ? true : false;
    }

    clear()
    {
        this.animations = [];
    }

    find(animation)
    {
        let index = this.animations.findIndex((anim) => {
            return anim.name === animation.name;
        });

        return index;
    }

    setNode(node)
    {
        this.node = node;
    }

    refresh(reflow = false)
    {
        this.node.style.animation = "none";
        if(reflow)
        {
            this.node.offsetHeight; //triggering reflow
        }
        this.node.style.animation = this.toString();
    }

    toString()
    {
        let animAttr = "";
        
        this.animations.forEach((animation, index) => {
            let keys = Object.keys(animation);

            keys.forEach((key) => {

                switch(key)
                {
                    case "id":
                        break;
                    case "duration":
                        animAttr += ` ${animation[key]/1000}s`;
                        break;
                    default:
                        animAttr += ` ${animation[key]}`;
                        break;
                }
                
            });

            animAttr += (index !== this.animations.length - 1) ? "," : "" ;
        });

        return animAttr;
    }
};



var useAnimator = () => {

    const animator = useRef(new Animator());
    const nodeRef = useRef(null);

    useEffect(() => {
        animator.current.setNode(nodeRef.current);
    }, []);

    return [animator.current, nodeRef];
};

export default useAnimator;