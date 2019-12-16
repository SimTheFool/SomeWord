
class Animator
{
    constructor(node = null)
    {
        this.animations = [];
        this.node = node;
    }

    add(animation)
    {
        this.animations.push(animation);
        this.node.style.animation = this.toString();
    }

    remove(animation)
    {
        let id = this.animations.findIndex((anim) => {
            return anim.name === animation.name;
        });

        if(id < 0)
        {
            return;
        }

        this.animations.splice(id, 1);
        this.node.style.animation = this.toString();
    }

    clear()
    {
        this.animations = [];
        this.node.style.animation = this.toString();
    }

    hasAnimation(animation)
    {
        return this.animations.some((anim) => {
            return anim.name === animation.name;
        });
    }

    setNode(node)
    {
        this.node = node;
    }

    toString()
    {
        let animAttr = "";
        
        this.animations.forEach((animation, index) => {
            let keys = Object.keys(animation);

            keys.forEach((key) => {

                animAttr += (key === "duration") ? ` ${animation[key]/1000}s` : ` ${animation[key]}`;
            });

            animAttr += (index !== this.animations.length - 1) ? "," : "" ;
        });

        return animAttr;
    }
}

export default Animator;